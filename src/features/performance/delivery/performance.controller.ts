import { Request, Response } from 'express';
import { GetPerformanceMetricsUseCase } from '../domain/get-performance-metrics.usecase';
import { MockPerformanceRepository } from '../data/mock-performance.repository';

const performanceRepository = new MockPerformanceRepository();
const getPerformanceMetricsUseCase = new GetPerformanceMetricsUseCase(performanceRepository);

export class PerformanceController {
  static async getMetrics(req: Request, res: Response) {
    try {
      const metrics = await getPerformanceMetricsUseCase.execute();
      return res.status(200).json(metrics);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
