import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import {
  Availability,
  IUserDocument,
  UserRole,
} from "./user.types";

const userSchema = new Schema<IUserDocument>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    city: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    skillsOffered: {
      type: [String],
      default: [],
    },

    skillsWanted: {
      type: [String],
      default: [],
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    availability: {
      type: String,
      enum: Object.values(Availability),
      default: Availability.FLEXIBLE,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

export const User =
  mongoose.models.User ||
  mongoose.model<IUserDocument>("User", userSchema);