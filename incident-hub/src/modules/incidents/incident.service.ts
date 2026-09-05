import { AppError } from "../../shared/errors/app-errors";
import { IncidentRepository } from "./incident.reporitory";

export class IncidentService {
  private readonly repository: IncidentRepository;

  constructor() {
    this.repository = new IncidentRepository();
  }
  
    async create(data: {
      title: string;
      description: string;
      severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    }) {
      return this.repository.create(data);
    }
  
    async findById(id: string) {
      return this.repository.findById(id);
    }
  
    async findAll(filters?: {
      status?: "OPEN" | "IN_PROGRESS" | "RESOLVED";
      severity?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    }) {
      return this.repository.findAll(filters);
    }
  
    async updateStatus(
      id: string,
      status: "OPEN" | "IN_PROGRESS" | "RESOLVED",
      changedBy?: string
    ) {
      // ...
    }
  
    async getDashboard() {
      return this.repository.getDashboard();
    }

    async createComment(
        incidentId: string,
        data: {
          author: string;
          content: string;
        }
      ) {
        const incident = await this.repository.findById(incidentId);
      
        if (!incident) {
          throw new AppError("Incident not found", 404);
        }
      
        return this.repository.createComment(
          incidentId,
          data
        );
      }

      async getTimeline(id: string) {
        const incident = await this.repository.findById(id);
      
        if (!incident) {
          throw new AppError("Incident not found", 404);
        }
      
        const timeline = [
          ...incident.history.map((item) => ({
            type: "STATUS_CHANGE" as const,
            date: item.changedAt,
            author: item.changedBy,
            previousStatus: item.previousStatus,
            newStatus: item.newStatus,
          })),
      
          ...incident.comments.map((comment) => ({
            type: "COMMENT" as const,
            date: comment.createdAt,
            author: comment.author,
            content: comment.content,
          })),
        ];
      
        return timeline.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        );
      }
  }