import axios from 'axios';
import { Conversation, ChatResponse, SendMessagePayload } from '../types';

const api = axios.create({
  baseURL: '', // Uses Vite proxy in development
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds for AI generation
});

export const chatService = {
  // Send message to Gemini via Express backend
  sendMessage: async (payload: SendMessagePayload): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>('/api/chat', payload);
    return response.data;
  },

  // Get all saved conversations
  getConversations: async (): Promise<Conversation[]> => {
    const response = await api.get<Conversation[]>('/api/conversations');
    return response.data;
  },

  // Get conversation by ID
  getConversationById: async (id: string): Promise<Conversation> => {
    const response = await api.get<Conversation>(`/api/conversations/${id}`);
    return response.data;
  },

  // Delete conversation by ID
  deleteConversation: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/api/conversations/${id}`);
    return response.data;
  },

  // Create new conversation
  createConversation: async (title?: string): Promise<Conversation> => {
    const response = await api.post<Conversation>('/api/conversations', { title });
    return response.data;
  },
};

export default api;

