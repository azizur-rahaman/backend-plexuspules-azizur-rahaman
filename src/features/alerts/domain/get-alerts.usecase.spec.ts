import { GetAlertsUseCase } from './get-alerts.usecase';
import { IAlertsRepository } from './alerts.repository';
import { Alert, AlertSeverity } from './alert.entity';

describe('GetAlertsUseCase', () => {
  let useCase: GetAlertsUseCase;
  let mockRepository: jest.Mocked<IAlertsRepository>;

  beforeEach(() => {
    mockRepository = {
      getAlerts: jest.fn(),
    };
    useCase = new GetAlertsUseCase(mockRepository);
  });

  it('should return alerts from repository', async () => {
    const mockAlerts: Alert[] = [
      { id: '1', title: 'Test Alert', description: 'Test Description', severity: AlertSeverity.CRITICAL, timestamp: new Date().toISOString() }
    ];
    mockRepository.getAlerts.mockResolvedValue(mockAlerts);

    const result = await useCase.execute();

    expect(result).toEqual(mockAlerts);
    expect(mockRepository.getAlerts).toHaveBeenCalledTimes(1);
  });
});
