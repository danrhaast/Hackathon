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
}