"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentController = void 0;
const incident_schema_1 = require("./incident.schema");
const incident_service_1 = require("./incident.service");
const incident_schema_2 = require("./incident.schema");
const incidentService = new incident_service_1.IncidentService();
class IncidentController {
    async create(req, res) {
        const data = incident_schema_1.createIncidentSchema.parse(req.body);
        const incident = await incidentService.create(data);
        return res.status(201).json(incident);
    }
    async findAll(req, res) {
        const status = req.query.status;
        const severity = req.query.severity;
        const incidents = await incidentService.findAll({
            status,
            severity,
        });
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
        const data = incident_schema_2.updateIncidentStatusSchema.parse(req.body);
        const incident = await incidentService.updateStatus(id, data.status, data.changedBy);
        return res.status(200).json(incident);
    }
}
exports.IncidentController = IncidentController;
//# sourceMappingURL=incident.controller.js.map