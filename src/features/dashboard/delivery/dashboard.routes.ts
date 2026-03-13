import { Router } from 'express';
import { DashboardController } from './dashboard.controller';
import { authMiddleware } from '../../../core/middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/metrics', DashboardController.getMetrics);

export default router;
