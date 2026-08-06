import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(2),

  bio: z
    .string()
    .max(300),

 city: z.string().max(50),

  country: z.string().max(50),

  skillsOffered: z.array(z.string()),

  skillsWanted: z.array(z.string()),

  experienceYears: z.number(),

  availability: z.enum([
    "WEEKDAYS",
    "WEEKENDS",
    "FLEXIBLE",
  ]),
});

export type UpdateProfileFormValues =
  z.infer<
    typeof updateProfileSchema
  >;