import { Schema, model, Types, Document } from "mongoose";
import { NotificationType } from "./notification.types";

export interface INotificationDocument extends Document {
  recipient: Types.ObjectId;
  sender: Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  referenceId?: Types.ObjectId;
  isRead: boolean;
}

const notificationSchema =
  new Schema<INotificationDocument>(
    {
      recipient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      type: {
        type: String,
        enum: Object.values(NotificationType),
        required: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
      },

      referenceId: {
        type: Schema.Types.ObjectId,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

notificationSchema.index({
  recipient: 1,
  createdAt: -1,
});

export const Notification =
  model<INotificationDocument>(
    "Notification",
    notificationSchema
  );