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

export const updateIncidentStatusSchema = z.object({
  status: z.enum([
    "OPEN",
    "IN_PROGRESS",
    "RESOLVED",
  ]),

  changedBy: z.string().min(1).optional(),
});

export type UpdateIncidentStatusInput = z.infer<
  typeof updateIncidentStatusSchema
>;

export const incidentFiltersSchema = z.object({
  status: z
    .enum([
      "OPEN",
      "IN_PROGRESS",
      "RESOLVED",
    ])
    .optional(),

  severity: z
    .enum([
      "LOW",
      "MEDIUM",
      "HIGH",
      "CRITICAL",
    ])
    .optional(),
});

export type IncidentFiltersInput = z.infer<
  typeof incidentFiltersSchema
>;