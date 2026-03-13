import { GetDevicesUseCase, GetDeviceDetailsUseCase } from './devices.usecases';
import { IDevicesRepository } from './devices.repository';
import { Device, DeviceDetails } from './device.entity';

describe('Devices UseCases', () => {
  let mockRepository: jest.Mocked<IDevicesRepository>;

  beforeEach(() => {
    mockRepository = {
      getDevices: jest.fn(),
      getDeviceById: jest.fn(),
    };
  });

  describe('GetDevicesUseCase', () => {
    let getDevicesUseCase: GetDevicesUseCase;

    beforeEach(() => {
      getDevicesUseCase = new GetDevicesUseCase(mockRepository);
    });

    it('should return a list of devices', async () => {
      const mockDevices: Device[] = [
        { 
          id: '1', 
          name: 'Device 1', 
          status: 'online', 
          ipAddress: '192.168.1.1', 
          location: 'Main Office',
          lastPing: new Date(),
          cpuUsage: 10,
          memoryUsage: 20
        }
      ];
      mockRepository.getDevices.mockResolvedValue(mockDevices);

      const result = await getDevicesUseCase.execute();

      expect(result).toEqual(mockDevices);
      expect(mockRepository.getDevices).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should pass search and status parameters to repository', async () => {
      mockRepository.getDevices.mockResolvedValue([]);

      await getDevicesUseCase.execute('search-term', 'online');

      expect(mockRepository.getDevices).toHaveBeenCalledWith('search-term', 'online');
    });
  });

  describe('GetDeviceDetailsUseCase', () => {
    let getDeviceDetailsUseCase: GetDeviceDetailsUseCase;

    beforeEach(() => {
      getDeviceDetailsUseCase = new GetDeviceDetailsUseCase(mockRepository);
    });

    it('should return device details if device exists', async () => {
      const mockDeviceDetails: DeviceDetails = {
        id: '1',
        name: 'Device 1',
        status: 'online',
        ipAddress: '192.168.1.1',
        location: 'Main Office',
        lastPing: new Date(),
        cpuUsage: 10,
        memoryUsage: 20,
        performanceHistory: [10, 20, 30]
      };
      mockRepository.getDeviceById.mockResolvedValue(mockDeviceDetails);

      const result = await getDeviceDetailsUseCase.execute('1');

      expect(result).toEqual(mockDeviceDetails);
      expect(mockRepository.getDeviceById).toHaveBeenCalledWith('1');
    });

    it('should return null if device does not exist', async () => {
      mockRepository.getDeviceById.mockResolvedValue(null);

      const result = await getDeviceDetailsUseCase.execute('non-existent');

      expect(result).toBeNull();
    });
  });
});
