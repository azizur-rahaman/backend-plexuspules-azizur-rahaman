import { FcmNotificationRepository } from './fcm-notification.repository';
import * as admin from 'firebase-admin';

// Mock firebase-admin
jest.mock('firebase-admin', () => ({
  messaging: jest.fn().mockReturnValue({
    send: jest.fn().mockResolvedValue('message-id'),
  }),
}));

describe('FcmNotificationRepository', () => {
  let repository: FcmNotificationRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new FcmNotificationRepository();
  });

  it('should save and retrieve tokens by user id', async () => {
    const userId = 'user-1';
    const token = 'token-1';

    await repository.saveToken(userId, token);
    const tokens = await repository.getTokensByUserId(userId);

    expect(tokens).toContain(token);
  });

  it('should return empty array for user with no tokens', async () => {
    const tokens = await repository.getTokensByUserId('non-existent');
    expect(tokens).toEqual([]);
  });

  it('should send push notification via firebase admin', async () => {
    const token = 'test-token';
    const title = 'Test Title';
    const body = 'Test Body';

    await repository.sendPushNotification(token, title, body);

    expect(admin.messaging().send).toHaveBeenCalledWith({
      notification: { title, body },
      token,
      data: {},
    });
  });

  it('should handle settings correctly', async () => {
    const userId = 'user-1';
    const defaultSettings = await repository.getSettings(userId);
    expect(defaultSettings.pushEnabled).toBe(true);

    const newSettings = { pushEnabled: false };
    await repository.updateSettings(userId, newSettings);
    const updatedSettings = await repository.getSettings(userId);
    expect(updatedSettings.pushEnabled).toBe(false);
  });
});
