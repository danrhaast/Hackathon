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
        comments: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  }

  async findAll(filters?: {
    status?: "OPEN" | "IN_PROGRESS" | "RESOLVED";
    severity?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  }) {
    return prisma.incident.findMany({
      where: {
        status: filters?.status,
        severity: filters?.severity,
      },
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

  async getDashboard() {
    const [
      total,
      open,
      inProgress,
      resolved,
      critical,
      high,
      medium,
      low,
    ] = await Promise.all([
      prisma.incident.count(),

      prisma.incident.count({
        where: {
          status: "OPEN",
        },
      }),

      prisma.incident.count({
        where: {
          status: "IN_PROGRESS",
        },
      }),

      prisma.incident.count({
        where: {
          status: "RESOLVED",
        },
      }),

      prisma.incident.count({
        where: {
          severity: "CRITICAL",
        },
      }),

      prisma.incident.count({
        where: {
          severity: "HIGH",
        },
      }),

      prisma.incident.count({
        where: {
          severity: "MEDIUM",
        },
      }),

      prisma.incident.count({
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

  async createComment(
    incidentId: string,
    data: {
      author: string;
      content: string;
    }
  ) {
    return prisma.incidentComment.create({
      data: {
        incidentId,
        author: data.author,
        content: data.content,
      },
    });
  }

}

