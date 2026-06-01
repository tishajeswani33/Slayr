import { Router } from 'express';
import { analyzeOutfit, getUserOutfits, getOutfitById } from '../controllers/outfitController.js';
import { protect } from '../middleware/authMiddleware.js';
import { aiAnalysisLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.use(protect);

router.post('/analyze', aiAnalysisLimiter, analyzeOutfit);
router.get('/user/:userId?', getUserOutfits);
router.get('/:id', getOutfitById);

export default router;
