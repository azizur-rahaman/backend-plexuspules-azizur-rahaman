import { IPerformanceRepository } from './performance.repository';
import { PerformanceMetrics } from './performance-metrics.entity';

export class GetPerformanceMetricsUseCase {
  constructor(private performanceRepository: IPerformanceRepository) {}
  async execute(): Promise<PerformanceMetrics> {
    return this.performanceRepository.getPerformanceMetrics();
  }
}
