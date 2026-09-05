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
  }