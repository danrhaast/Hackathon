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
            },
        });
    }
    async findAll() {
        return prisma_1.prisma.incident.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
}
exports.IncidentRepository = IncidentRepository;
//# sourceMappingURL=incident.reporitory.js.map