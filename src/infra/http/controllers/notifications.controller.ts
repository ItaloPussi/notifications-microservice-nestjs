import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CancelNotification } from 'src/application/use-cases/cancel-notification';
import { CountNotifications } from 'src/application/use-cases/count-notifications';
import { GetRecipientNotifications } from 'src/application/use-cases/get-recipient-notifications';
import { ReadNotification } from 'src/application/use-cases/read-notification';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { UnreadNotification } from 'src/application/use-cases/unread-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { FrontModelNotificationMapper } from '../mappers/front-model-notification-mapper';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countNotifications: CountNotifications,
    private getRecipientNotifications: GetRecipientNotifications
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    const { notification } = await this.sendNotification.execute({
      content,
      recipientId,
      category,
    });

    const notificationData =
      FrontModelNotificationMapper.toFrontModel(notification);
    return { notification: notificationData };
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({notificationId: id})
  }
  
  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const {count} = await this.countNotifications.execute({recipientId})

    return {count}
  }

  @Get('get/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const {notifications} = await this.getRecipientNotifications.execute({recipientId})

    const notificationsData = notifications.map(notification => FrontModelNotificationMapper.toFrontModel(notification))
    return { notificationsData }
  }

  @Post(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({notificationId: id})
  }

  @Post(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({notificationId: id})
  }
}
