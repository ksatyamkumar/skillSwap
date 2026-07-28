import { Schema, model } from "mongoose";
import {
  ExchangeStatus,
  IExchangeDocument,
} from "./exchange.types";

const exchangeSchema = new Schema<IExchangeDocument>(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skill: {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    status: {
      type: String,
      enum: Object.values(ExchangeStatus),
      default: ExchangeStatus.PENDING,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Indexes
 */
exchangeSchema.index({ requester: 1 });

exchangeSchema.index({ receiver: 1 });

exchangeSchema.index({ skill: 1 });

exchangeSchema.index({
  requester: 1,
  skill: 1,
  status: 1,
});

export const Exchange = model<IExchangeDocument>(
  "Exchange",
  exchangeSchema
);