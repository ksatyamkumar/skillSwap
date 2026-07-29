import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
// import { validate } from "../../middleware/validate.middleware";
// import { updateProfileSchema } from "./user.validation";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  userController.getMyProfile
);

router.patch(
  "/me",
  authMiddleware,
  // validate(updateProfileSchema),
  userController.updateMyProfile
);

router.get(
  "/:id/reviews",
  userController.getUserReviews
);

router.get(
  "/:id/rating",
  userController.getUserRating
);

export default router;