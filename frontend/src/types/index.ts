export type MessageRole = 'user' | 'assistant';

export interface Message {
  _id?: string;
  role: MessageRole;
  content: string;
  timestamp?: string | Date;
}

export interface Conversation {
  _id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface SendMessagePayload {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  conversationId: string;
  title: string;
  reply: string;
}

export interface ApiErrorResponse {
  error: string;
  details?: string;
}

