import { IDevicesRepository } from '../domain/devices.repository';
import { Device, DeviceDetails } from '../domain/device.entity';

export class MockDevicesRepository implements IDevicesRepository {
  private devices: DeviceDetails[] = [
    {
      id: 'd1',
      name: 'Router-Main-01',
      ipAddress: '192.168.1.1',
      location: 'Server Room A',
      status: 'online',
      lastPing: new Date(),
      cpuUsage: 12.5,
      memoryUsage: 45.2,
      performanceHistory: [25, 30, 28, 32, 35, 30, 31]
    },
    {
      id: 'd2',
      name: 'Switch-L2-Office',
      ipAddress: '192.168.1.10',
      location: 'Office Floor 2',
      status: 'online',
      lastPing: new Date(),
      cpuUsage: 5.2,
      memoryUsage: 22.8,
      performanceHistory: [12, 13, 14, 13, 12, 13, 14]
    },
    {
      id: 'd3',
      name: 'Storage-NAS-01',
      ipAddress: '192.168.1.50',
      location: 'Data Center B',
      status: 'offline',
      lastPing: new Date(Date.now() - 3600000),
      cpuUsage: 0,
      memoryUsage: 0,
      performanceHistory: [0, 0, 0, 0, 0, 0, 0]
    },
    {
      id: 'd4',
      name: 'AP-Guest-Entrance',
      ipAddress: '192.168.1.101',
      location: 'Reception',
      status: 'online',
      lastPing: new Date(),
      cpuUsage: 25.8,
      memoryUsage: 68.4,
      performanceHistory: [40, 42, 46, 50, 48, 45, 47]
    }
  ];

  async getDevices(search?: string, status?: string): Promise<Device[]> {
    let filtered = this.devices;
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(d => d.name.toLowerCase().includes(s) || d.ipAddress.includes(s));
    }
    if (status) {
      filtered = filtered.filter(d => d.status === status.toLowerCase());
    }
    return filtered.map(({ performanceHistory, ...rest }) => rest);
  }

  async getDeviceById(id: string): Promise<DeviceDetails | null> {
    return this.devices.find(d => d.id === id) || null;
  }

  async updateDeviceStatus(id: string, status: 'online' | 'offline'): Promise<DeviceDetails | null> {
    const device = this.devices.find(d => d.id === id);
    if (!device) return null;

    device.status = status;
    device.lastPing = new Date();
    
    if (status === 'offline') {
      device.cpuUsage = 0;
      device.memoryUsage = 0;
    }

    return device;
  }
}
