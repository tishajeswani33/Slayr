import { Router } from 'express';
import { createMoodboard, getMoodboards, getMoodboardById } from '../controllers/moodboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getMoodboards);
router.get('/:id', getMoodboardById);

router.post('/', protect, createMoodboard);

export default router;
