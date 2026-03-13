import { IDashboardRepository } from '../domain/dashboard.repository';
import { DashboardMetrics } from '../domain/dashboard.entity';

export class MockDashboardRepository implements IDashboardRepository {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return {
      totalDevices: 4,
      onlineDevices: 3,
      offlineDevices: 1,
      alerts: 2,
    };
  }
}
