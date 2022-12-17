import { Module } from '@nestjs/common'
import { SendNotification } from 'src/application/use-cases/send-notification';
import { DatabaseModule } from 'src/infra/database/database.module';
import { NotificationsController } from './kafka/controllers/notifications.controller';
import { KafkaConsumerService } from './kafka/kakfa-consumer.service';

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        KafkaConsumerService,
        SendNotification
    ],
    controllers: [
        NotificationsController
    ]
})
export class MessagingModule {}