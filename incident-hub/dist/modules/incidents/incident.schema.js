"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIncidentStatusSchema = exports.createIncidentSchema = void 0;
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
//# sourceMappingURL=incident.schema.js.map