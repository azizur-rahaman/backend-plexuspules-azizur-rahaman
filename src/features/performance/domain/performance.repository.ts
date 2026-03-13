import { PerformanceMetrics } from './performance-metrics.entity';

export interface IPerformanceRepository {
  getPerformanceMetrics(): Promise<PerformanceMetrics>;
}
