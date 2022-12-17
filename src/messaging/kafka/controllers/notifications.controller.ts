import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from '@nestjs/microservices'
import { SendNotification } from "src/application/use-cases/send-notification";

interface SendNotificationPayload {
    content: string;
    category: string;
    recipientId: string;
}

@Controller()
export class NotificationsController {
    constructor(
        private sendNotification: SendNotification
    ) {}

    @EventPattern(process.env.KAFKA_TOPIC_NAME)
    async handleSendNotification(
        @Payload() {content, category, recipientId}: SendNotificationPayload
    ){
        await this.sendNotification.execute({
            content,
            category,
            recipientId
        })
    }
}