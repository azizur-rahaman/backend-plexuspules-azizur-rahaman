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

  static async getSettings(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'anonymous';
      const settings = await notificationRepository.getSettings(userId);
      return sendResponse(res, 200, settings, 'Settings retrieved successfully');
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  static async updateSettings(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id || 'anonymous';
      const settings = req.body;
      await notificationRepository.updateSettings(userId, settings);
      return sendResponse(res, 200, settings, 'Settings updated successfully');
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }

  static async sendTestNotification(req: Request, res: Response) {
    try {
      const { title, body } = req.body;
      const tokens = await notificationRepository.getAllRegisteredTokens();
      
      if (tokens.length === 0) {
        throw new AppError('No registered tokens found', 404);
      }

      await Promise.all(
        tokens.map(token => 
          notificationRepository.sendPushNotification(
            token, 
            title || 'Test Notification', 
            body || 'This is a test notification from Plexus Pulse backend'
          )
        )
      );

      return sendResponse(res, 200, null, `Test notification sent to ${tokens.length} tokens`);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ status: 'error', message: error.message });
    }
  }
}
