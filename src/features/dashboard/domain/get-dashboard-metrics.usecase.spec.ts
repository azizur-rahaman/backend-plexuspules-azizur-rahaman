import { GetDashboardMetricsUseCase } from './get-dashboard-metrics.usecase';
import { IDashboardRepository } from './dashboard.repository';
import { DashboardMetrics } from './dashboard.entity';

describe('GetDashboardMetricsUseCase', () => {
  let useCase: GetDashboardMetricsUseCase;
  let mockRepository: jest.Mocked<IDashboardRepository>;

  const mockMetrics: DashboardMetrics = {
    totalDevices: 100,
    onlineDevices: 95,
    offlineDevices: 5,
    alerts: 10,
  };

  beforeEach(() => {
    mockRepository = {
      getDashboardMetrics: jest.fn(),
    };
    useCase = new GetDashboardMetricsUseCase(mockRepository);
  });

  it('should return dashboard metrics from repository', async () => {
    mockRepository.getDashboardMetrics.mockResolvedValue(mockMetrics);

    const result = await useCase.execute();

    expect(result).toEqual(mockMetrics);
    expect(mockRepository.getDashboardMetrics).toHaveBeenCalledTimes(1);
  });
});
