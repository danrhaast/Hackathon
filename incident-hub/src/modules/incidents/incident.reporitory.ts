import { prisma } from "../../database/prisma";

export class IncidentRepository {
  async create(data: {
    title: string;
    description: string;
    severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  }) {
    return prisma.incident.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.incident.findUnique({
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
    return prisma.incident.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateStatus(
    id: string,
    previousStatus: "OPEN" | "IN_PROGRESS" | "RESOLVED",
    newStatus: "OPEN" | "IN_PROGRESS" | "RESOLVED",
    changedBy?: string
  ) {
    return prisma.$transaction(async (transaction) => {
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
}