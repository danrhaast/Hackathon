import { Router } from "express";
import { IncidentController } from "./incident.controller";

const incidentRoutes = Router();

const incidentController = new IncidentController();

incidentRoutes.post(
    "/",
    incidentController.create.bind(incidentController)
);

incidentRoutes.get(
    "/",
    incidentController.findAll.bind(incidentController)
);

incidentRoutes.get(
    "/dashboard",
    incidentController.getDashboard.bind(incidentController)
);

incidentRoutes.get(
    "/:id",
    incidentController.findById.bind(incidentController)
);

incidentRoutes.patch(
    "/:id/status",
    incidentController.updateStatus.bind(incidentController)
);

incidentRoutes.post(
    "/:id/comments",
    incidentController.createComment.bind(incidentController)
);

incidentRoutes.get(
    "/:id/timeline",
    incidentController.getTimeline.bind(incidentController)
);

export { incidentRoutes };