import { Document, Types } from "mongoose";

export enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  EXPERT = "EXPERT",
}

export interface ISkill {
  title: string;
  description: string;
  category: string;
  level: SkillLevel;
  owner: Types.ObjectId;
  isActive: boolean;
}

export interface ISkillDocument extends ISkill, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: SkillLevel;
  sort?: "newest" | "oldest";
}