import { z } from "zod";

export const createIncidentSchema = z.object({
  title: z
    .string()
    .min(3, "Title must have at least 3 characters"),

  description: z
    .string()
    .min(5, "Description must have at least 5 characters"),

  severity: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "CRITICAL",
  ]),
});

export type CreateIncidentInput = z.infer<
  typeof createIncidentSchema
>;