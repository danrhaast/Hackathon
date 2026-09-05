"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentController = void 0;
const incident_schema_1 = require("./incident.schema");
const incident_service_1 = require("./incident.service");
const incidentService = new incident_service_1.IncidentService();
class IncidentController {
    async create(req, res) {
        const data = incident_schema_1.createIncidentSchema.parse(req.body);
        const incident = await incidentService.create(data);
        return res.status(201).json(incident);
    }
    async findAll(_req, res) {
        const incidents = await incidentService.findAll();
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
}
exports.IncidentController = IncidentController;
//# sourceMappingURL=incident.controller.js.map