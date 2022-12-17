import { Notification as RawNotification} from '@prisma/client'
import { Content } from 'src/application/entities/content';
import { Notification } from 'src/application/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
      readAt: notification.readAt
    };
  }

  static toDomain(rawNotification: RawNotification): Notification {
    return new Notification({
      category: rawNotification.category,
      content: new Content(rawNotification.content),
      recipientId: rawNotification.recipientId,
      createdAt: rawNotification.createdAt,
      readAt: rawNotification.readAt,
      canceledAt: rawNotification.canceledAt
    }, rawNotification.id)
  }
}
