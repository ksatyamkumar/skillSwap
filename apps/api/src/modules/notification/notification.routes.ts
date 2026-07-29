import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware";

import { notificationController } from "./notification.controller";

const router = Router();

router.use(authMiddleware);

router.get(
  "/",
  notificationController.getMyNotifications
);

router.patch(
  "/read-all",
  notificationController.markAllAsRead
);

router.patch(
  "/:id/read",
  notificationController.markAsRead
);

router.delete(
  "/:id",
  notificationController.deleteNotification
);

export default router;