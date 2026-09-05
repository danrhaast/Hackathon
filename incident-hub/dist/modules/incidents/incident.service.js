"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentService = void 0;
const app_errors_1 = require("../../shared/errors/app-errors");
const incident_reporitory_1 = require("./incident.reporitory");
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
    async findAll(filters) {
        return this.repository.findAll(filters);
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
    async getDashboard() {
        return this.repository.getDashboard();
    }
    async createComment(incidentId, data) {
        const incident = await this.repository.findById(incidentId);
        if (!incident) {
            throw new app_errors_1.AppError("Incident not found", 404);
        }
        return this.repository.createComment(incidentId, data);
    }
    async getTimeline(id) {
        const incident = await this.repository.findById(id);
        if (!incident) {
            throw new app_errors_1.AppError("Incident not found", 404);
        }
        const timeline = [
            ...incident.history.map((item) => ({
                type: "STATUS_CHANGE",
                date: item.changedAt,
                author: item.changedBy,
                previousStatus: item.previousStatus,
                newStatus: item.newStatus,
            })),
            ...incident.comments.map((comment) => ({
                type: "COMMENT",
                date: comment.createdAt,
                author: comment.author,
                content: comment.content,
            })),
        ];
        return timeline.sort((a, b) => a.date.getTime() - b.date.getTime());
    }
}
exports.IncidentService = IncidentService;
//# sourceMappingURL=incident.service.js.map