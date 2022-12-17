import { Module } from '@nestjs/common';
import { CancelNotification } from 'src/application/use-cases/cancel-notification';
import { CountNotifications } from 'src/application/use-cases/count-notifications';
import { GetRecipientNotifications } from 'src/application/use-cases/get-recipient-notifications';
import { ReadNotification } from 'src/application/use-cases/read-notification';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { UnreadNotification } from 'src/application/use-cases/unread-notification';
import { NotificationsController } from '../../infra/http/controllers/notifications.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification, CancelNotification, ReadNotification, UnreadNotification, CountNotifications, GetRecipientNotifications],
})
export class HttpModule {}
