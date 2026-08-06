// export interface UserProfile {
//   _id: string;

//   fullName: string;

//   email: string;

//   bio?: string;

//   location?: string;

//   profilePicture?: string;

//   skillsOffered: string[];

//   skillsWanted: string[];

//   averageRating?: number;

//   reviewCount?: number;

//   createdAt?: string;

//   updatedAt?: string;
// }

type Availability = "WEEKDAYS" | "WEEKENDS" | "FLEXIBLE";

export interface UserProfile {
  _id: string;

  fullName: string;

  email: string;

  role: string;

  avatar: string;

  bio: string;

  city: string;

  country: string;

  skillsOffered: string[];

  skillsWanted: string[];

  experienceYears: number;

  availability: Availability;

  rating: number;

  reviewCount: number;

  isVerified: boolean;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}