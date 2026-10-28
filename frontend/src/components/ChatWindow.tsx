import React, { useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeScreen } from './WelcomeScreen';

export const ChatWindow: React.FC = () => {
  const { messages, isLoading } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return <WelcomeScreen />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 space-y-1">
      {messages.map((msg, index) => (
        <MessageBubble key={msg._id || index} message={msg} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
};

