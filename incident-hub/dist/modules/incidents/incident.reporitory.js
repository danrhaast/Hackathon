"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentRepository = void 0;
const prisma_1 = require("../../database/prisma");
class IncidentRepository {
    async create(data) {
        return prisma_1.prisma.incident.create({
            data,
        });
    }
    async findById(id) {
        return prisma_1.prisma.incident.findUnique({
            where: {
                id,
            },
            include: {
                history: {
                    orderBy: {
                        changedAt: "asc",
                    },
                },
                comments: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
    }
    async findAll(filters) {
        return prisma_1.prisma.incident.findMany({
            where: {
                status: filters?.status,
                severity: filters?.severity,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async updateStatus(id, previousStatus, newStatus, changedBy) {
        return prisma_1.prisma.$transaction(async (transaction) => {
            const incident = await transaction.incident.update({
                where: {
                    id,
                },
                data: {
                    status: newStatus,
                },
            });
            await transaction.incidentHistory.create({
                data: {
                    incidentId: id,
                    previousStatus,
                    newStatus,
                    changedBy,
                },
            });
            return incident;
        });
    }
    async getDashboard() {
        const [total, open, inProgress, resolved, critical, high, medium, low,] = await Promise.all([
            prisma_1.prisma.incident.count(),
            prisma_1.prisma.incident.count({
                where: {
                    status: "OPEN",
                },
            }),
            prisma_1.prisma.incident.count({
                where: {
                    status: "IN_PROGRESS",
                },
            }),
            prisma_1.prisma.incident.count({
                where: {
                    status: "RESOLVED",
                },
            }),
            prisma_1.prisma.incident.count({
                where: {
                    severity: "CRITICAL",
                },
            }),
            prisma_1.prisma.incident.count({
                where: {
                    severity: "HIGH",
                },
            }),
            prisma_1.prisma.incident.count({
                where: {
                    severity: "MEDIUM",
                },
            }),
            prisma_1.prisma.incident.count({
                where: {
                    severity: "LOW",
                },
            }),
        ]);
        return {
            total,
            open,
            inProgress,
            resolved,
            critical,
            high,
            medium,
            low,
        };
    }
    async createComment(incidentId, data) {
        return prisma_1.prisma.incidentComment.create({
            data: {
                incidentId,
                author: data.author,
                content: data.content,
            },
        });
    }
}
exports.IncidentRepository = IncidentRepository;
//# sourceMappingURL=incident.reporitory.js.map