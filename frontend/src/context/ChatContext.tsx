import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message, Conversation } from '../types';
import { chatService } from '../services/api';

interface ChatContextType {
  messages: Message[];
  conversations: Conversation[];
  activeConversationId: string | null;
  isLoading: boolean;
  error: string | null;
  isSidebarOpen: boolean;
  sendMessage: (content: string) => Promise<void>;
  createNewChat: () => void;
  selectConversation: (id: string) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  clearAllConversations: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setError: (err: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Fetch conversations from backend on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await chatService.getConversations();
        if (Array.isArray(data) && data.length > 0) {
          setConversations(data);
        } else {
          const saved = localStorage.getItem('gemini_saved_chats');
          if (saved) setConversations(JSON.parse(saved));
        }
      } catch (err) {
        console.warn('Backend conversations unavailable, using local cache:', err);
        const saved = localStorage.getItem('gemini_saved_chats');
        if (saved) {
          try {
            setConversations(JSON.parse(saved));
          } catch {
            // ignore
          }
        }
      }
    };
    fetchConversations();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const createNewChat = () => {
    setActiveConversationId(null);
    setMessages([]);
    setError(null);
  };

  const selectConversation = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setActiveConversationId(id);
      setIsSidebarOpen(false);

      const conv = await chatService.getConversationById(id);
      setMessages(conv.messages || []);
    } catch (err: any) {
      console.warn('Failed to fetch full conversation from API, checking local state:', err);
      const local = conversations.find(c => c._id === id);
      if (local) {
        setMessages(local.messages || []);
      } else {
        setError('Failed to load conversation messages.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      await chatService.deleteConversation(id);
    } catch (err) {
      console.warn('Delete conversation API call failed, removing locally:', err);
    }
    setConversations(prev => {
      const updated = prev.filter(c => c._id !== id);
      localStorage.setItem('gemini_saved_chats', JSON.stringify(updated));
      return updated;
    });
    if (activeConversationId === id) {
      createNewChat();
    }
  };

  const clearAllConversations = () => {
    conversations.forEach(c => {
      chatService.deleteConversation(c._id).catch(() => {});
    });
    setConversations([]);
    localStorage.removeItem('gemini_saved_chats');
    createNewChat();
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    setError(null);

    try {
      const data = await chatService.sendMessage({
        message: content.trim(),
        conversationId: activeConversationId || undefined,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toISOString(),
      };

      setMessages([...newMessages, assistantMessage]);

      const convId = data.conversationId || activeConversationId || Date.now().toString();
      setActiveConversationId(convId);

      // Refresh or update conversation list
      setConversations(prev => {
        const title = data.title || prev.find(c => c._id === convId)?.title || content.slice(0, 30) + '...';
        const updated = prev.filter(c => c._id !== convId);
        const newConv: Conversation = {
          _id: convId,
          title,
          messages: [...newMessages, assistantMessage],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const all = [newConv, ...updated];
        localStorage.setItem('gemini_saved_chats', JSON.stringify(all));
        return all;
      });
    } catch (err: any) {
      console.error('Chat error:', err);
      const msg = err.response?.data?.error || err.message || 'Failed to generate response. Please try again.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        conversations,
        activeConversationId,
        isLoading,
        error,
        isSidebarOpen,
        sendMessage,
        createNewChat,
        selectConversation,
        deleteConversation,
        clearAllConversations,
        toggleSidebar,
        closeSidebar,
        setError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
