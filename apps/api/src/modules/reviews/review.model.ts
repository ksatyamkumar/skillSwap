import { Schema, model, Types, Document } from "mongoose";

export interface IReviewDocument extends Document {
  reviewer: Types.ObjectId;
  reviewee: Types.ObjectId;
  exchange: Types.ObjectId;
  rating: number;
  comment?: string;
}

const reviewSchema = new Schema<IReviewDocument>(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reviewee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exchange: {
      type: Schema.Types.ObjectId,
      ref: "Exchange",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index(
  {
    exchange: 1,
    reviewer: 1,
  },
  {
    unique: true,
  }
);

export const Review = model<IReviewDocument>(
  "Review",
  reviewSchema
);