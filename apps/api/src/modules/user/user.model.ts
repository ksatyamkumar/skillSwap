import mongoose, { Schema, Document } from "mongoose";
import { IUser, UserRole } from "./user.types";

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
      index: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    skillsToTeach: {
      type: [String],
      default: [],
      index: true,
    },

    skillsToLearn: {
      type: [String],
      default: [],
      index: true,
    },

    timeCredits: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      index: true,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    refreshToken: {
      type: String,
      default: "",
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = mongoose.model<IUserDocument>("User", userSchema);