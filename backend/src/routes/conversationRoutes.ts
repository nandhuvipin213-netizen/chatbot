import { Router } from 'express';
import {
  getConversations,
  getConversationById,
  createConversation,
  deleteConversation,
} from '../controllers/conversationController';

const router = Router();

router.get('/', getConversations);
router.get('/:id', getConversationById);
router.post('/', createConversation);
router.delete('/:id', deleteConversation);

export default router;

