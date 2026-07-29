import { Types } from "mongoose";

export interface CreateReviewDto {
  exchangeId: string;
  rating: number;
  comment?: string;
}

export interface CreateReviewData {
  reviewer: Types.ObjectId;
  reviewee: Types.ObjectId;
  exchange: Types.ObjectId;
  rating: number;
  comment?: string;
}