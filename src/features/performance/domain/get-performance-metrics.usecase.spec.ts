import { GetPerformanceMetricsUseCase } from './get-performance-metrics.usecase';
import { IPerformanceRepository } from './performance.repository';
import { PerformanceMetrics } from './performance-metrics.entity';

describe('GetPerformanceMetricsUseCase', () => {
  let useCase: GetPerformanceMetricsUseCase;
  let mockRepository: jest.Mocked<IPerformanceRepository>;

  beforeEach(() => {
    mockRepository = {
      getPerformanceMetrics: jest.fn(),
    };
    useCase = new GetPerformanceMetricsUseCase(mockRepository);
  });

  it('should return performance metrics from repository', async () => {
    const mockMetrics: PerformanceMetrics = {
      cpuUsage: 45,
      memoryUsage: 60,
      networkTraffic: 100,
      cpuHistory: [40, 45],
      memoryHistory: [55, 60],
    };
    mockRepository.getPerformanceMetrics.mockResolvedValue(mockMetrics);

    const result = await useCase.execute();

    expect(result).toEqual(mockMetrics);
    expect(mockRepository.getPerformanceMetrics).toHaveBeenCalledTimes(1);
  });
});
