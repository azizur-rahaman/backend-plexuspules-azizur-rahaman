import { Request, Response } from 'express';
import { notificationRepository } from '../data/fcm-notification.repository';
import { sendResponse } from '../../../core/utils/response';
import { AppError } from '../../../core/utils/app-error';

export class NotificationController {
  static async registerToken(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const userId = (req as any).user?.id || 'anonymous';

      if (!token) {
        throw new AppError('Token is required', 400);
      }

      await notificationRepository.saveToken(userId, token);
      return sendResponse(res, 201, null, 'Token registered successfully');
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }
}
