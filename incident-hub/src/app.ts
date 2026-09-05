import express from "express";
import cors from "cors";

import { incidentRoutes } from "./modules/incidents/incident.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "incident-hub",
  });
});

app.use("/incidents", incidentRoutes);

export { app };