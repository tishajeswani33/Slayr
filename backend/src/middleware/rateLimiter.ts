import rateLimit from 'express-rate-limit';

// Standard rate limiter: max 100 requests per 15 minutes per IP
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    status: 'fail',
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for AI Gemini vision queries: max 10 analysis uploads per 10 minutes per IP
export const aiAnalysisLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  message: {
    status: 'fail',
    message: 'AI analysis quota exceeded. You can only analyze 10 outfits every 10 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
