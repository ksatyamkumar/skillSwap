import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";

import { reviewController } from "./review.controller";
import { createReviewSchema } from "./review.validation";
// import { createReviewSchema } from "./review.validation";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createReviewSchema),
  reviewController.createReview
);

router.delete(
  "/:id",
  authMiddleware,
  reviewController.deleteReview
);


export default router;