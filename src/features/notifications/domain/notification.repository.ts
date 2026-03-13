export interface INotificationRepository {
  sendPushNotification(token: string, title: string, body: string, data?: Record<string, string>): Promise<void>;
  saveToken(userId: string, token: string): Promise<void>;
  getTokensByUserId(userId: string): Promise<string[]>;
}
