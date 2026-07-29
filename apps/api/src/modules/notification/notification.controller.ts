import { Response } from "express";

import { notificationService } from "./notification.service";

import { asyncHandler } from "../../utils/asynchandler";
import { ApiResponse } from "../../utils/ApiResponse";

class NotificationController {
  getMyNotifications = asyncHandler(
    async (req, res: Response) => {
      const notifications =
        await notificationService.getMyNotifications(
          req.user!.id
        );

      ApiResponse.success(
        res,
        notifications,
        "Notifications fetched successfully"
      );
    }
  );

  markAsRead = asyncHandler(
    async (req, res: Response) => {
      const notification =
        await notificationService.markAsRead(
          req.params.id,
          req.user!.id
        );

      ApiResponse.success(
        res,
        notification,
        "Notification marked as read"
      );
    }
  );

  markAllAsRead = asyncHandler(
    async (req, res: Response) => {
      await notificationService.markAllAsRead(
        req.user!.id
      );

      ApiResponse.success(
        res,
        null,
        "All notifications marked as read"
      );
    }
  );

  deleteNotification = asyncHandler(
    async (req, res: Response) => {
      await notificationService.deleteNotification(
        req.params.id,
        req.user!.id
      );

      ApiResponse.success(
        res,
        null,
        "Notification deleted successfully"
      );
    }
  );
}

export const notificationController =
  new NotificationController();