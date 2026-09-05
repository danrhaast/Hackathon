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
  "/:id",
  incidentController.findById.bind(incidentController)
);

export { incidentRoutes };