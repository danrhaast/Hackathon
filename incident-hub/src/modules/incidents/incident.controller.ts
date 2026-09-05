import { Request, Response } from "express";
import { createIncidentSchema } from "./incident.schema";
import { IncidentService } from "./incident.service";

const incidentService = new IncidentService();

export class IncidentController {
    async create(req: Request, res: Response) {
        const data = createIncidentSchema.parse(req.body);

        const incident = await incidentService.create(data);

        return res.status(201).json(incident);
    }

    async findAll(_req: Request, res: Response) {
        const incidents = await incidentService.findAll();

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
}