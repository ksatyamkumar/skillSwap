import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asynchandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { reviewService } from "./review.service";
import { userService } from "../user";

class ReviewController {
  createReview = asyncHandler(
    async (req: Request, res: Response) => {
      const review =
        await reviewService.createReview(
          req.body,
          req.user!.id
        );

      ApiResponse.success(
        res,
        review,
        "Review submitted successfully",
      );
    }
  );

deleteReview = asyncHandler(
  async (req, res) => {
    await reviewService.deleteReview(
      req.params.id,
      req.user!.id
    );

    ApiResponse.success(
      res,
      null,
      "Review deleted successfully"
    );
  }
);


}

export const reviewController =
  new ReviewController();