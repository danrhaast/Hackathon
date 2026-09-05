import express from "express";
import cors from "cors";

import { incidentRoutes } from "./modules/incidents/incident.routes";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

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

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };