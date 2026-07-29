import { notificationRepository } from "./notification.repository";

import {
  CreateNotificationData,
} from "./notification.types";

import {
  ForbiddenError,
  NotFoundError,
} from "../../shared/errors";

class NotificationService {
  async createNotification(
    data: CreateNotificationData
  ) {
    return notificationRepository.create(data);
  }

  async getMyNotifications(
    userId: string
  ) {
    return notificationRepository.findByRecipient(
      userId
    );
  }

  async markAsRead(
    notificationId: string,
    userId: string
  ) {
    const notification =
      await notificationRepository.findById(
        notificationId
      );

    if (!notification) {
      throw new NotFoundError(
        "Notification not found"
      );
    }

    if (
      notification.recipient.toString() !==
      userId
    ) {
      throw new ForbiddenError(
        "You are not allowed to update this notification"
      );
    }

    return notificationRepository.markAsRead(
      notificationId
    );
  }

  async markAllAsRead(
    userId: string
  ) {
    await notificationRepository.markAllAsRead(
      userId
    );
  }

  async deleteNotification(
    notificationId: string,
    userId: string
  ) {
    const notification =
      await notificationRepository.findById(
        notificationId
      );

    if (!notification) {
      throw new NotFoundError(
        "Notification not found"
      );
    }

    if (
      notification.recipient.toString() !==
      userId
    ) {
      throw new ForbiddenError(
        "You are not allowed to delete this notification"
      );
    }

    await notificationRepository.delete(
      notificationId
    );
  }
}

export const notificationService =
  new NotificationService();