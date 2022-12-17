import { Notification } from 'src/application/entities/notification';

export class FrontModelNotificationMapper {
  static toFrontModel(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      canceledAt: notification.canceledAt,
      readAt: notification.readAt,
      createdAt: notification.createdAt
    };
  }
}
