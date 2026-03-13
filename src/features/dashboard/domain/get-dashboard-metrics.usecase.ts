import { IDashboardRepository } from './dashboard.repository';
import { DashboardMetrics } from './dashboard.entity';

export class GetDashboardMetricsUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}
  async execute(): Promise<DashboardMetrics> {
    return this.dashboardRepository.getDashboardMetrics();
  }
}
