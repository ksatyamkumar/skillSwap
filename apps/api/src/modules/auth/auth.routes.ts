import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// Register User
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
    "/refresh",
    authController.refresh
);

router.post(
    "/logout",
    authController.logout
);

export default router;