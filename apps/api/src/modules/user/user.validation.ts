import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),

  bio: z.string().max(500).optional(),

  city: z.string().optional(),

  country: z.string().optional(),

  avatar: z.string().url().optional(),

  skillsOffered: z.array(z.string()).optional(),

  skillsWanted: z.array(z.string()).optional(),

  experienceYears: z.number().min(0).max(50).optional(),

  availability: z
    .enum(["FULL_TIME", "PART_TIME", "FLEXIBLE"])
    .optional(),
});