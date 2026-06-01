import { Router } from 'express';
import { login, signup, getProfile, updateProfile, getStyleDNA, firebaseLogin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/firebase-login', firebaseLogin);

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/style-dna', protect, getStyleDNA);

export default router;
