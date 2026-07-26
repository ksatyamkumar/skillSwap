export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  name: string;
  email: string;
  password: string;

  role: UserRole;

  avatar?: string;
  bio?: string;
  location?: string;

  skillsToTeach: string[];
  skillsToLearn: string[];

  timeCredits: number;

  rating: number;
  reviewCount: number;

  isVerified: boolean;
  isActive: boolean;

  refreshToken?: string;
}