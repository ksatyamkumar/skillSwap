import { z } from "zod";
import { SkillLevel } from "./skill.types";

export const createSkillSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description cannot exceed 1000 characters"),

    category: z
      .string()
      .trim()
      .min(2, "Category is required")
      .max(50, "Category cannot exceed 50 characters"),

    level: z.nativeEnum(SkillLevel, {
      error: () => ({
        message: "Level must be BEGINNER, INTERMEDIATE or EXPERT",
      }),
    }),

    isActive: z.boolean().optional(),
  }),
});

export const updateSkillSchema = z.object({
  body: z
    .object({
      title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters")
        .optional(),

      description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description cannot exceed 1000 characters")
        .optional(),

      category: z
        .string()
        .trim()
        .min(2, "Category is required")
        .max(50, "Category cannot exceed 50 characters")
        .optional(),

      level: z
        .nativeEnum(SkillLevel, {
          error: () => ({
            message: "Level must be BEGINNER, INTERMEDIATE or EXPERT",
          }),
        })
        .optional(),

      isActive: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update",
    }),
});