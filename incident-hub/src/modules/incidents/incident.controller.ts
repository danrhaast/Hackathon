import { Request, Response } from "express";
import { IncidentService } from "./incident.service";
import {
    createIncidentSchema,
    updateIncidentStatusSchema,
    incidentFiltersSchema,
  } from "./incident.schema";

const incidentService = new IncidentService();

export class IncidentController {
    async create(req: Request, res: Response) {
        const data = createIncidentSchema.parse(req.body);

        const incident = await incidentService.create(data);

        return res.status(201).json(incident);
    }

    async findAll(req: Request, res: Response) {
        const filters = incidentFiltersSchema.parse(req.query);
      
        const incidents = await incidentService.findAll(filters);
      
        return res.status(200).json(incidents);
      }

    async findById(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        const incident = await incidentService.findById(id);

        if (!incident) {
            return res.status(404).json({
                message: "Incident not found",
            });
        }

        return res.status(200).json(incident);
    }

    async updateStatus(req: Request, res: Response) {
        const { id } = req.params as { id: string };

        const data = updateIncidentStatusSchema.parse(req.body);

        const incident = await incidentService.updateStatus(
            id,
            data.status,
            data.changedBy
        );

        return res.status(200).json(incident);
    }

    async getDashboard(_req: Request, res: Response) {
        const dashboard = await incidentService.getDashboard();

        return res.status(200).json(dashboard);
    }
}