import { Types } from "mongoose";
import { Review, IReviewDocument } from "./review.model";
import { CreateReviewData } from "./review.types";

class ReviewRepository {
  async create(
    data: CreateReviewData
  ): Promise<IReviewDocument> {
    return Review.create(data);
  }

  async findByExchangeAndReviewer(
    exchangeId: string,
    reviewerId: string
  ) {
    return Review.findOne({
      exchange: exchangeId,
      reviewer: reviewerId,
    });
  }

  async findById(id: string) {
    return Review.findById(id);
  }

  async findByReviewee(revieweeId: string) {
    return Review.find({
      reviewee: revieweeId,
    })
      .populate("reviewer", "fullName avatar")
      .sort({
        createdAt: -1,
      });
  }

  async delete(id: string) {
    return Review.findByIdAndDelete(id);
  }


async getAverageRating(revieweeId: string) {
  return Review.aggregate([
    {
      $match: {
        reviewee: new Types.ObjectId(revieweeId),
      },
    },
    {
      $group: {
        _id: "$reviewee",
        averageRating: {
          $avg: "$rating",
        },
        totalReviews: {
          $sum: 1,
        },
      },
    },
  ]);
}
}

export const reviewRepository =
  new ReviewRepository();