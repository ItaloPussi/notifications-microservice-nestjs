import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface CountNotificationsRequest {
  recipientId: string;
}

interface CountNotificationsResponse {
    count: number;
}

@Injectable()
export class CountNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountNotificationsRequest,
  ): Promise<CountNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(recipientId)

    return {
        count
    }
  }
}
