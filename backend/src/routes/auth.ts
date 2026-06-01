import { Router } from 'express';
import { login, signup, getProfile, updateProfile, getStyleDNA } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/style-dna', protect, getStyleDNA);

export default router;
