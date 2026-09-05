import { IncidentRepository } from "./incident.reporitory";
import { AppError } from "../../shared/errors/app-errors";

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

  async findAll() {
    return this.repository.findAll();
  }

  async updateStatus(
    id: string,
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED",
    changedBy?: string
  ) {
    const incident = await this.repository.findById(id);
  
    if (!incident) {
      throw new AppError("Incident not found", 404);
    }
  
    const currentStatus = incident.status;
  
    if (
      currentStatus === "OPEN" &&
      status === "RESOLVED" &&
      incident.severity === "CRITICAL"
    ) {
      throw new AppError(
        "Critical incidents must pass through In Progress before being resolved",
        400
      );
    }
  
    if (currentStatus === status) {
      throw new AppError(
        "Incident already has this status",
        400
      );
    }
  
    return this.repository.updateStatus(
      id,
      currentStatus,
      status,
      changedBy
    );
  }
}