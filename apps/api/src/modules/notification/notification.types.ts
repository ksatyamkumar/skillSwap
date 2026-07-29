import { Types } from "mongoose";

export enum NotificationType {
  EXCHANGE_REQUEST = "EXCHANGE_REQUEST",
  EXCHANGE_ACCEPTED = "EXCHANGE_ACCEPTED",
  EXCHANGE_REJECTED = "EXCHANGE_REJECTED",
  EXCHANGE_COMPLETED = "EXCHANGE_COMPLETED",
  REVIEW_RECEIVED = "REVIEW_RECEIVED",
}

export interface CreateNotificationData {
  recipient: Types.ObjectId;
  sender: Types.ObjectId;
  type: NotificationType;
  title: string;
  message: string;
  referenceId?: Types.ObjectId;
}