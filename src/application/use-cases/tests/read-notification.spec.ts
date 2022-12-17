import { InMemoryNotificationsRepository } from '../../../../test/repositories/in-memory-notifications-repository';
import { ReadNotification } from '../read-notification';
import { NotificationNotFound } from '../errors/notification-not-found';
import { MakeNotification } from '../../../../test/factories/notification-factory';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository)

    const notification = MakeNotification()

    await notificationsRepository.create(notification)

    await readNotification.execute({
        notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a notification when it not exists', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository)

    expect(() => {
        return readNotification.execute({
            notificationId: 'potato-potahto'
        })
    }).rejects.toThrow(NotificationNotFound)
  });
});
