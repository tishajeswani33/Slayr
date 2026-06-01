import { Router } from 'express';
import { consultStylist } from '../controllers/stylistController.js';
import { protect } from '../middleware/authMiddleware.js';
import { aiAnalysisLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Protect endpoints and apply rate limiters to avoid API query spams
router.post('/consult', protect, aiAnalysisLimiter, consultStylist);

export default router;
