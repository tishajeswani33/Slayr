import { Router } from 'express';
import { getTrendingAesthetics, getTrendingCreators } from '../controllers/trendController.js';

const router = Router();

router.get('/aesthetics', getTrendingAesthetics);
router.get('/creators', getTrendingCreators);

export default router;
