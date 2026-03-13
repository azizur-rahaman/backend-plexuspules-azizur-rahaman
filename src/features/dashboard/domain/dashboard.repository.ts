import { DashboardMetrics } from './dashboard.entity';

export interface IDashboardRepository {
  getDashboardMetrics(): Promise<DashboardMetrics>;
}
