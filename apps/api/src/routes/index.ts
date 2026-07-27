import { Router } from "express";
import healthRoutes from "./health.route";
import authRoutes from "../modules/auth";
import { userRoutes } from "../modules/user";
import { skillRoutes } from "../modules/skill";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/skills", skillRoutes);

export default router;