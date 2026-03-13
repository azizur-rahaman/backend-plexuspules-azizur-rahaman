import { Router } from 'express';
import { PerformanceController } from './performance.controller';
import { authMiddleware } from '../../../core/middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/metrics', PerformanceController.getMetrics);

export default router;
