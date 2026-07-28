import { z } from "zod";
import { ExchangeStatus } from "./exchange.types";

export const createExchangeSchema = z.object({
  body: z.object({
    skillId: z.string().min(1, "Skill ID is required"),

    message: z
      .string()
      .max(500, "Message cannot exceed 500 characters")
      .optional(),
  }),
});

export const updateExchangeStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      ExchangeStatus.ACCEPTED,
      ExchangeStatus.REJECTED,
    ]),
  }),
});