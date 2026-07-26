import { Document } from "mongoose";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum Availability {
  WEEKDAYS = "WEEKDAYS",
  WEEKENDS = "WEEKENDS",
  FLEXIBLE = "FLEXIBLE",
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;

  role: UserRole;

  avatar?: string;

  bio?: string;

  city?: string;

  country?: string;

  skillsOffered: string[];

  skillsWanted: string[];

  experienceYears: number;

  availability: Availability;

  rating: number;

  reviewCount: number;

  isVerified: boolean;

  isActive: boolean;
}

export interface IUserDocument extends IUser, Document {}