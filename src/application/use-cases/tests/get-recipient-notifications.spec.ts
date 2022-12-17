import { InMemoryNotificationsRepository } from '../../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from '../get-recipient-notifications';
import { MakeNotification } from '../../../../test/factories/notification-factory';

describe('Get Notifications', () => {
  it('should be able to get notifications by RecipientId', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository)

    await notificationsRepository.create(MakeNotification({
      recipientId: 'example-recipient-id'
    }))

    await notificationsRepository.create(MakeNotification({
      recipientId: 'example-recipient-id'
    }))

    await notificationsRepository.create(MakeNotification({
        recipientId: 'example-recipient-id'
    }))
  
    await notificationsRepository.create(MakeNotification({
        recipientId: 'any-id'
      }))

    const test1 = await getRecipientNotifications.execute({recipientId: 'example-recipient-id'})
    const test2 = await getRecipientNotifications.execute({recipientId: 'potato-potahto'})
    expect(test1.notifications.length).toEqual(3)
    expect(test1.notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'example-recipient-id'}),
      expect.objectContaining({ recipientId: 'example-recipient-id'}),
      expect.objectContaining({ recipientId: 'example-recipient-id'}),
    ]))
    expect(test2.notifications.length).toEqual(0)
  });
});
