import { GetDashboardMetricsUseCase } from '../domain/get-dashboard-metrics.usecase';
import { IMonitoringRepository } from '../domain/monitoring.repository';
import { DashboardMetrics } from '../domain/dashboard.entity';

describe('GetDashboardMetricsUseCase', () => {
  let useCase: GetDashboardMetricsUseCase;
  let mockRepository: jest.Mocked<IMonitoringRepository>;

  const mockMetrics: DashboardMetrics = {
    totalDevices: 10,
    onlineDevices: 8,
    offlineDevices: 2,
    alerts: 3,
  };

  beforeEach(() => {
    mockRepository = {
      getDevices: jest.fn(),
      getDeviceById: jest.fn(),
      getDashboardMetrics: jest.fn(),
    };
    useCase = new GetDashboardMetricsUseCase(mockRepository);
  });

  it('should return metrics from the repository', async () => {
    mockRepository.getDashboardMetrics.mockResolvedValue(mockMetrics);

    const result = await useCase.execute();

    expect(result).toEqual(mockMetrics);
    expect(mockRepository.getDashboardMetrics).toHaveBeenCalled();
  });
});
