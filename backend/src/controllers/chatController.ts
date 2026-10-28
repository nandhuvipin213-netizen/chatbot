import { Request, Response } from 'express';
import { Conversation, IMessage } from '../models/Conversation';
import { generateGeminiReply } from '../services/geminiService';
import { inMemoryStore } from './conversationController';

export const handleChatMessage = async (req: Request, res: Response) => {
  try {
    const { message, conversationId } = req.body;

    // Validation
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message content is required.' });
    }

    if (message.length > 8000) {
      return res.status(400).json({ error: 'Message exceeds maximum length of 8000 characters.' });
    }

    let conversation: any = null;
    let history: IMessage[] = [];

    // Find existing conversation if conversationId is provided
    if (conversationId) {
      if (Conversation.db.readyState === 1) {
        conversation = await Conversation.findById(conversationId);
      } else {
        conversation = inMemoryStore.get(conversationId);
      }

      if (conversation) {
        history = conversation.messages || [];
      }
    }

    // Call Gemini API with message and history context
    const aiReply = await generateGeminiReply(message, history);

    const userMsg: IMessage = {
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };

    const assistantMsg: IMessage = {
      role: 'assistant',
      content: aiReply,
      timestamp: new Date(),
    };

    let savedId = conversationId;
    let title = conversation?.title || message.trim().slice(0, 36) + (message.length > 36 ? '...' : '');

    if (Conversation.db.readyState === 1) {
      if (conversation) {
        conversation.messages.push(userMsg);
        conversation.messages.push(assistantMsg);
        await conversation.save();
        savedId = conversation._id.toString();
      } else {
        const newConv = await Conversation.create({
          title,
          messages: [userMsg, assistantMsg],
        });
        savedId = newConv._id.toString();
      }
    } else {
      // In-memory fallback
      if (conversation) {
        conversation.messages.push(userMsg);
        conversation.messages.push(assistantMsg);
        conversation.updatedAt = new Date();
      } else {
        savedId = Date.now().toString();
        const newConv = {
          _id: savedId,
          title,
          messages: [userMsg, assistantMsg],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        inMemoryStore.set(savedId, newConv);
      }
    }

    return res.json({
      conversationId: savedId,
      title,
      reply: aiReply,
    });
  } catch (error: any) {
    console.error('Chat Controller Error:', error);
    return res.status(error.status || 500).json({
      error: error.message || 'Failed to process chat message with Gemini.',
    });
  }
};

