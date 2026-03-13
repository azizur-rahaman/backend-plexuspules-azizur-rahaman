import { IPerformanceRepository } from '../domain/performance.repository';
import { PerformanceMetrics } from '../domain/performance-metrics.entity';

export class MockPerformanceRepository implements IPerformanceRepository {
  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    return {
      cpuUsage: 34.5,
      memoryUsage: 62.1,
      networkTraffic: 128.4,
      cpuHistory: [30, 32, 35, 34, 36, 38, 40, 42, 45, 43, 41, 44],
      memoryHistory: [55, 58, 60, 62, 61, 63, 65, 64, 62, 63, 65, 66]
    };
  }
}
