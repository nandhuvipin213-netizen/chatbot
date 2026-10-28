import rateLimit from 'express-rate-limit';

export const chatRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: {
    error: 'Too many requests sent. Please wait a moment before sending another message.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

