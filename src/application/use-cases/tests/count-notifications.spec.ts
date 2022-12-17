import { InMemoryNotificationsRepository } from '../../../../test/repositories/in-memory-notifications-repository';
import { CountNotifications } from '../count-notifications';
import { MakeNotification } from '../../../../test/factories/notification-factory';

describe('Count Notifications', () => {
  it('should be able to count notifications by RecipientId', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countNotification = new CountNotifications(notificationsRepository)

    await notificationsRepository.create(MakeNotification({
      recipientId: 'example-recipient-id'
    }))

    await notificationsRepository.create(MakeNotification({
      recipientId: 'example-recipient-id'
    }))
  
    const test1 = await countNotification.execute({recipientId: 'example-recipient-id'})
    const test2 = await countNotification.execute({recipientId: 'non-existing-recipient-id'})
    expect(test1.count).toEqual(2)
    expect(test2.count).toEqual(0)
  });
});
