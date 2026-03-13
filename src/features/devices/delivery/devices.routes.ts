import { Router } from 'express';
import { DevicesController } from './devices.controller';
import { authMiddleware } from '../../../core/middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);
router.get('/', DevicesController.getDevices);
router.get('/:id', DevicesController.getDeviceDetails);

export default router;
