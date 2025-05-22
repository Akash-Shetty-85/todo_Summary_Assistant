// middlewares/rateLimiter.js
import rateLimit from 'express-rate-limit';

export const summarizeLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: { error: 'Too many summary requests. Please try again later.' },
});
