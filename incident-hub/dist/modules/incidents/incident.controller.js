"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentController = void 0;
const incident_service_1 = require("./incident.service");
const incident_schema_1 = require("./incident.schema");
const incidentService = new incident_service_1.IncidentService();
class IncidentController {
    async create(req, res) {
        const data = incident_schema_1.createIncidentSchema.parse(req.body);
        const incident = await incidentService.create(data);
        return res.status(201).json(incident);
    }
    async findAll(req, res) {
        const filters = incident_schema_1.incidentFiltersSchema.parse(req.query);
        const incidents = await incidentService.findAll(filters);
        return res.status(200).json(incidents);
    }
    async findById(req, res) {
        const { id } = req.params;
        const incident = await incidentService.findById(id);
        if (!incident) {
            return res.status(404).json({
                message: "Incident not found",
            });
        }
        return res.status(200).json(incident);
    }
    async updateStatus(req, res) {
        const { id } = req.params;
        const data = incident_schema_1.updateIncidentStatusSchema.parse(req.body);
        const incident = await incidentService.updateStatus(id, data.status, data.changedBy);
        return res.status(200).json(incident);
    }
    async getDashboard(_req, res) {
        const dashboard = await incidentService.getDashboard();
        return res.status(200).json(dashboard);
    }
    async createComment(req, res) {
        const { id } = req.params;
        const data = incident_schema_1.createCommentSchema.parse(req.body);
        const comment = await incidentService.createComment(id, data);
        return res.status(201).json(comment);
    }
    async getTimeline(req, res) {
        const { id } = req.params;
        const timeline = await incidentService.getTimeline(id);
        return res.status(200).json(timeline);
    }
}
exports.IncidentController = IncidentController;
//# sourceMappingURL=incident.controller.js.map