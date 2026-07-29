import { reviewRepository } from "./review.repository";
import { exchangeRepository } from "../exchange/exchange.repository";
import { ExchangeStatus } from "../exchange/exchange.types";

import {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  ConflictError,
} from "../../shared/errors";

import {
  CreateReviewDto,
  CreateReviewData,
} from "./review.types";

import { Types } from "mongoose";
import { userRepository } from "../user";

class ReviewService {
  async createReview(
    data: CreateReviewDto,
    userId: string
  ) {
    const exchange =
      await exchangeRepository.findById(
        data.exchangeId
      );

    if (!exchange) {
      throw new NotFoundError(
        "Exchange not found"
      );
    }

    if (
      exchange.status !==
      ExchangeStatus.COMPLETED
    ) {
      throw new BadRequestError(
        "Only completed exchanges can be reviewed"
      );
    }

    const isRequester =
      exchange.requester._id.toString() === userId;

    const isReceiver =
      exchange.receiver._id.toString() === userId;

    if (!isRequester && !isReceiver) {
      throw new ForbiddenError(
        "You are not part of this exchange"
      );
    }

    const alreadyReviewed =
      await reviewRepository.findByExchangeAndReviewer(
        data.exchangeId,
        userId
      );

    if (alreadyReviewed) {
      throw new ConflictError(
        "You have already reviewed this exchange"
      );
    }

    const reviewee = isRequester
      ? exchange.receiver._id
      : exchange.requester._id;

    const reviewData: CreateReviewData = {
      reviewer: new Types.ObjectId(userId),
      reviewee,
      exchange: exchange._id,
      rating: data.rating,
      comment: data.comment,
    };

    return reviewRepository.create(reviewData);
  }


async deleteReview(
  reviewId: string,
  userId: string
) {
  const review = await reviewRepository.findById(reviewId);

  if (!review) {
    throw new NotFoundError("Review not found");
  }

  if (review.reviewer.toString() !== userId) {
    throw new ForbiddenError(
      "You are not allowed to delete this review"
    );
  }

  await reviewRepository.delete(reviewId);
}
  

}

export const reviewService =
  new ReviewService();