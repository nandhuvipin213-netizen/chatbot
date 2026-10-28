import { Request, Response } from 'express';
import { Conversation } from '../models/Conversation';

// In-memory fallback if MongoDB is not connected
const inMemoryStore = new Map<string, any>();

export const getConversations = async (_req: Request, res: Response) => {
  try {
    if (Conversation.db.readyState === 1) {
      const conversations = await Conversation.find()
        .sort({ updatedAt: -1 })
        .select('_id title updatedAt createdAt');
      return res.json(conversations);
    }

    // Fallback to in-memory store
    const list = Array.from(inMemoryStore.values())
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .map(c => ({ _id: c._id, title: c.title, updatedAt: c.updatedAt, createdAt: c.createdAt }));

    return res.json(list);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to retrieve conversations' });
  }
};

export const getConversationById = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (Conversation.db.readyState === 1) {
      const conv = await Conversation.findById(id);
      if (!conv) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
      return res.json(conv);
    }

    const conv = inMemoryStore.get(id);
    if (!conv) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    return res.json(conv);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to retrieve conversation' });
  }
};

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const initialTitle = title || 'New Conversation';

    if (Conversation.db.readyState === 1) {
      const newConv = await Conversation.create({
        title: initialTitle,
        messages: [],
      });
      return res.status(201).json(newConv);
    }

    const id = Date.now().toString();
    const newConv = {
      _id: id,
      title: initialTitle,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    inMemoryStore.set(id, newConv);
    return res.status(201).json(newConv);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to create conversation' });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (Conversation.db.readyState === 1) {
      const deleted = await Conversation.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
      return res.json({ message: 'Conversation deleted successfully' });
    }

    if (inMemoryStore.has(id)) {
      inMemoryStore.delete(id);
      return res.json({ message: 'Conversation deleted successfully' });
    }

    return res.status(404).json({ error: 'Conversation not found' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Failed to delete conversation' });
  }
};

export { inMemoryStore };
