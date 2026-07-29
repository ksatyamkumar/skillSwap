import { Notification, INotificationDocument } from "./notification.model";
import { CreateNotificationData } from "./notification.types";

class NotificationRepository {
  async create(
    data: CreateNotificationData
  ): Promise<INotificationDocument> {
    return Notification.create(data);
  }

  async findByRecipient(
    recipientId: string
  ) {
    return Notification.find({
      recipient: recipientId,
    })
      .populate("sender", "fullName avatar")
      .sort({
        createdAt: -1,
      });
  }

  async findById(id: string) {
    return Notification.findById(id);
  }

  async markAsRead(id: string) {
    return Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
  }

  async markAllAsRead(
    recipientId: string
  ) {
    return Notification.updateMany(
      {
        recipient: recipientId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );
  }

  async delete(id: string) {
    return Notification.findByIdAndDelete(id);
  }
}

export const notificationRepository =
  new NotificationRepository();