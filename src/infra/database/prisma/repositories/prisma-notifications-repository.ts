import { Injectable } from '@nestjs/common';
import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: prismaNotificationData,
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findFirst({
      where: {
        id: notificationId
      }
    })

    if(!notification){
      return null
    }

    const domainNotification = PrismaNotificationMapper.toDomain(notification)
    return domainNotification
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId
      }
    })

    const domainNotifications = notifications.map(element => PrismaNotificationMapper.toDomain(element))

    return domainNotifications
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId
      }
    })

    return count
  }

  async save(notification: Notification): Promise<void> {
    const prismaNotificationData = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.update({
      data: prismaNotificationData,
      where: {
        id: prismaNotificationData.id
      }
    })
  }
}
