import { Router } from "express";
import { authController } from "./auth.controller";
import { authMiddleware  } from "../../middleware/auth.middleware";


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
    authMiddleware,
    authController.logout
);

export default router;