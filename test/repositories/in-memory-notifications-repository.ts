import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{

  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(notificationId: string): Promise<Notification | null> {
    return this.notifications.find(element => element.id == notificationId) || null
  }
  
  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex(element => element.id == notification.id)

    if(index != -1){
      this.notifications[index] = notification
    }
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const filteredNotifications = this.notifications.filter(element => element.recipientId === recipientId)
    return filteredNotifications.length
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const filteredNotifications = this.notifications.filter(element => element.recipientId === recipientId)
    return filteredNotifications
  }
}
