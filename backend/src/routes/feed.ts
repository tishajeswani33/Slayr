import { Router } from 'express';
import { getPersonalizedUserFeed, saveOutfitToFavorites } from '../controllers/feedController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);

router.get('/', getPersonalizedUserFeed);
router.post('/save', saveOutfitToFavorites);

export default router;
