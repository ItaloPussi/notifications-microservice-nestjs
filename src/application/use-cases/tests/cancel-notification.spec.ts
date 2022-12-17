import { InMemoryNotificationsRepository } from '../../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from '../cancel-notification';
import { NotificationNotFound } from '../errors/notification-not-found';
import { MakeNotification } from '../../../../test/factories/notification-factory';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = MakeNotification()

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
        notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
  });

  it('should not be able to cancel a notification when it not exists', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() => {
        return cancelNotification.execute({
            notificationId: 'potato-potahto'
        })
    }).rejects.toThrow(NotificationNotFound)
  });
});
