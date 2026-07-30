import { Router } from "express";
import authRoutes from "../modules/auth";
import { userRoutes } from "../modules/user";
import { skillRoutes } from "../modules/skill";
import { exchangeRoutes } from "../modules/exchange";
import { reviewRoutes } from "../modules/reviews";
import { notificationRoutes } from "../modules/notification";
import { healthRoutes } from "../modules/health";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/skills", skillRoutes);
router.use("/exchanges", exchangeRoutes);
router.use(
  "/reviews",
  reviewRoutes
);
router.use(
  "/notifications",
  notificationRoutes
);

export default router;