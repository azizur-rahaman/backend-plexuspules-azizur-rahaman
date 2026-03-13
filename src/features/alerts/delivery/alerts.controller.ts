import { Request, Response } from 'express';
import { GetAlertsUseCase } from '../domain/get-alerts.usecase';
import { MockAlertsRepository } from '../data/mock-alerts.repository';
import { sendResponse } from '../../../core/utils/response';

const alertsRepository = new MockAlertsRepository();
const getAlertsUseCase = new GetAlertsUseCase(alertsRepository);

export class AlertsController {
  static async getAlerts(req: Request, res: Response) {
    try {
      const alerts = await getAlertsUseCase.execute();
      return sendResponse(res, 200, alerts, 'Alerts retrieved successfully');
    } catch (error: any) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }
}
