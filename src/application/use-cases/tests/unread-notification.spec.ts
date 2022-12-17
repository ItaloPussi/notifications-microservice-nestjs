import { InMemoryNotificationsRepository } from '../../../../test/repositories/in-memory-notifications-repository';
import { UnreadNotification } from '../unread-notification';
import { NotificationNotFound } from '../errors/notification-not-found';
import { MakeNotification } from '../../../../test/factories/notification-factory';

describe('Read Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository)

    const notification = MakeNotification()
    notification.read()

    await notificationsRepository.create(notification)

    await unreadNotification.execute({
        notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].readAt).toEqual(null);
  });

  it('should not be able to unread a notification when it not exists', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository)

    expect(() => {
        return unreadNotification.execute({
            notificationId: 'potato-potahto'
        })
    }).rejects.toThrow(NotificationNotFound)
  });
});
