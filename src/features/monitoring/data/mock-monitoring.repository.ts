import { IMonitoringRepository } from '../domain/monitoring.repository';
import { Device, DeviceDetails } from '../domain/device.entity';
import { DashboardMetrics } from '../domain/dashboard.entity';
import { notificationRepository } from '../../notifications/data/fcm-notification.repository';

export class MockMonitoringRepository implements IMonitoringRepository {
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
      cpuHistory: [10, 15, 12, 14, 18, 12, 13],
      memoryHistory: [40, 42, 45, 44, 46, 45, 45]
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
      cpuHistory: [4, 5, 6, 5, 4, 5, 6],
      memoryHistory: [20, 21, 22, 22, 23, 22, 23]
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
      cpuHistory: [0, 0, 0, 0, 0, 0, 0],
      memoryHistory: [0, 0, 0, 0, 0, 0, 0]
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
      cpuHistory: [20, 22, 28, 30, 25, 24, 26],
      memoryHistory: [60, 62, 65, 70, 68, 66, 68]
    }
  ];

  private async notifyUserOffline(deviceName: string) {
    const tokens = await notificationRepository.getAllRegisteredTokens();
    if (tokens.length === 0) {
      console.log(`[Alert] No tokens registered. Skipping notification for ${deviceName}`);
      return;
    }
    
    console.log(`[Alert] Triggering offline notification for ${deviceName} to ${tokens.length} devices`);
    
    for (const token of tokens) {
      await notificationRepository.sendPushNotification(
        token,
        'Device Offline',
        `${deviceName} has gone offline!`,
        { type: 'OFFLINE_ALERT', deviceName }
      );
    }
  }

  async getDevices(search?: string, status?: string): Promise<Device[]> {
    let filtered = this.devices;

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(s) || d.ipAddress.includes(s)
      );
    }

    if (status) {
      filtered = filtered.filter(d => d.status === status.toLowerCase());
    }

    return filtered.map(({ cpuHistory, memoryHistory, ...rest }) => rest);
  }

  async getDeviceById(id: string): Promise<DeviceDetails | null> {
    const device = this.devices.find(d => d.id === id);
    if (!device) return null;

    if (device.status === 'online') {
      device.cpuUsage = Math.max(0, Math.min(100, device.cpuUsage + (Math.random() * 4 - 2)));
      device.memoryUsage = Math.max(0, Math.min(100, device.memoryUsage + (Math.random() * 2 - 1)));
      device.lastPing = new Date();
    }

    return device;
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    // Simulate random status change for one device
    const deviceIndex = Math.floor(Math.random() * this.devices.length);
    const device = this.devices[deviceIndex];
    const oldStatus = device.status;
    const newStatus = Math.random() > 0.1 ? 'online' : 'offline';

    if (oldStatus === 'online' && newStatus === 'offline') {
      // Don't await to avoid blocking the API response
      this.notifyUserOffline(device.name).catch(console.error);
    }

    device.status = newStatus;

    const online = this.devices.filter(d => d.status === 'online').length;
    const offline = this.devices.filter(d => d.status === 'offline').length;
    const alerts = this.devices.filter(d => d.cpuUsage > 80 || d.status === 'offline').length;

    return {
      totalDevices: this.devices.length,
      onlineDevices: online,
      offlineDevices: offline,
      alerts: alerts
    };
  }
}
