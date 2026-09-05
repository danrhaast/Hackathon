"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentService = void 0;
const incident_reporitory_1 = require("./incident.reporitory");
const app_errors_1 = require("../../shared/errors/app-errors");
class IncidentService {
    repository;
    constructor() {
        this.repository = new incident_reporitory_1.IncidentRepository();
    }
    async create(data) {
        return this.repository.create(data);
    }
    async findById(id) {
        return this.repository.findById(id);
    }
    async findAll() {
        return this.repository.findAll();
    }
    async updateStatus(id, status, changedBy) {
        const incident = await this.repository.findById(id);
        if (!incident) {
            throw new app_errors_1.AppError("Incident not found", 404);
        }
        const currentStatus = incident.status;
        if (currentStatus === "OPEN" &&
            status === "RESOLVED" &&
            incident.severity === "CRITICAL") {
            throw new app_errors_1.AppError("Critical incidents must pass through In Progress before being resolved", 400);
        }
        if (currentStatus === status) {
            throw new app_errors_1.AppError("Incident already has this status", 400);
        }
        return this.repository.updateStatus(id, currentStatus, status, changedBy);
    }
}
exports.IncidentService = IncidentService;
//# sourceMappingURL=incident.service.js.map