import { Router } from 'express';
import { handleChatMessage } from '../controllers/chatController';
import { chatRateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', chatRateLimiter, handleChatMessage);

export default router;

