"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incidentRoutes = void 0;
const express_1 = require("express");
const incident_controller_1 = require("./incident.controller");
const incidentRoutes = (0, express_1.Router)();
exports.incidentRoutes = incidentRoutes;
const incidentController = new incident_controller_1.IncidentController();
incidentRoutes.post("/", incidentController.create.bind(incidentController));
incidentRoutes.get("/", incidentController.findAll.bind(incidentController));
incidentRoutes.get("/dashboard", incidentController.getDashboard.bind(incidentController));
incidentRoutes.get("/:id", incidentController.findById.bind(incidentController));
incidentRoutes.patch("/:id/status", incidentController.updateStatus.bind(incidentController));
incidentRoutes.post("/:id/comments", incidentController.createComment.bind(incidentController));
incidentRoutes.get("/:id/timeline", incidentController.getTimeline.bind(incidentController));
//# sourceMappingURL=incident.routes.js.map