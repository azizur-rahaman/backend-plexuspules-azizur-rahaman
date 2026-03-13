import { Request, Response } from 'express';
import { GetDashboardMetricsUseCase } from '../domain/get-dashboard-metrics.usecase';
import { MockDashboardRepository } from '../data/mock-dashboard.repository';

const dashboardRepository = new MockDashboardRepository();
const getDashboardMetricsUseCase = new GetDashboardMetricsUseCase(dashboardRepository);

export class DashboardController {
  static async getMetrics(req: Request, res: Response) {
    try {
      const metrics = await getDashboardMetricsUseCase.execute();
      return res.status(200).json(metrics);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
