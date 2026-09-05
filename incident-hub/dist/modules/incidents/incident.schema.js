"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentSchema = exports.incidentFiltersSchema = exports.updateIncidentStatusSchema = exports.createIncidentSchema = void 0;
const zod_1 = require("zod");
exports.createIncidentSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, "Title must have at least 3 characters"),
    description: zod_1.z
        .string()
        .min(5, "Description must have at least 5 characters"),
    severity: zod_1.z.enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
    ]),
});
exports.updateIncidentStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "OPEN",
        "IN_PROGRESS",
        "RESOLVED",
    ]),
    changedBy: zod_1.z.string().min(1).optional(),
});
exports.incidentFiltersSchema = zod_1.z.object({
    status: zod_1.z
        .enum([
        "OPEN",
        "IN_PROGRESS",
        "RESOLVED",
    ])
        .optional(),
    severity: zod_1.z
        .enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL",
    ])
        .optional(),
});
exports.createCommentSchema = zod_1.z.object({
    author: zod_1.z
        .string()
        .trim()
        .min(1, "Author is required"),
    content: zod_1.z
        .string()
        .trim()
        .min(1, "Comment content is required"),
});
//# sourceMappingURL=incident.schema.js.map