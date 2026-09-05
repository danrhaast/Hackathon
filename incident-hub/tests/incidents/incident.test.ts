import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../src/app";

describe("Incident Listing", () => {
    it("should list all incidents", async () => {
      await request(app)
        .post("/incidents")
        .send({
          title: "Open incident",
          description: "Testing incident listing",
          severity: "LOW",
        });
  
      await request(app)
        .post("/incidents")
        .send({
          title: "Critical incident",
          description: "Testing incident listing",
          severity: "CRITICAL",
        });
  
      const response = await request(app)
        .get("/incidents");
  
      expect(response.status).toBe(200);
  
      expect(Array.isArray(response.body)).toBe(true);
  
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  
    it("should filter incidents by severity", async () => {
      await request(app)
        .post("/incidents")
        .send({
          title: "High incident",
          description: "Testing severity filter",
          severity: "HIGH",
        });
  
      await request(app)
        .post("/incidents")
        .send({
          title: "Low incident",
          description: "Testing severity filter",
          severity: "LOW",
        });
  
      const response = await request(app)
        .get("/incidents?severity=HIGH");
  
      expect(response.status).toBe(200);
  
      expect(response.body.length).toBeGreaterThanOrEqual(1);
  
      expect(
        response.body.every(
          (incident: { severity: string }) =>
            incident.severity === "HIGH"
        )
      ).toBe(true);
    });
  
    it("should filter incidents by status", async () => {
      const createResponse = await request(app)
        .post("/incidents")
        .send({
          title: "In progress incident",
          description: "Testing status filter",
          severity: "MEDIUM",
        });
  
      const incidentId = createResponse.body.id;
  
      await request(app)
        .patch(`/incidents/${incidentId}/status`)
        .send({
          status: "IN_PROGRESS",
          changedBy: "Test",
        });
  
      const response = await request(app)
        .get("/incidents?status=IN_PROGRESS");
  
      expect(response.status).toBe(200);
  
      expect(response.body.length).toBeGreaterThanOrEqual(1);
  
      expect(
        response.body.every(
          (incident: { status: string }) =>
            incident.status === "IN_PROGRESS"
        )
      ).toBe(true);
    });

    it("should filter incidents by status and severity", async () => {
        const matchingIncident = await request(app)
          .post("/incidents")
          .send({
            title: "High in progress incident",
            description: "Testing combined filters",
            severity: "HIGH",
          });
      
        const matchingIncidentId = matchingIncident.body.id;
      
        await request(app)
          .patch(`/incidents/${matchingIncidentId}/status`)
          .send({
            status: "IN_PROGRESS",
            changedBy: "Test",
          });
      
        await request(app)
          .post("/incidents")
          .send({
            title: "High open incident",
            description: "Should not match status filter",
            severity: "HIGH",
          });
      
        await request(app)
          .post("/incidents")
          .send({
            title: "Low in progress incident",
            description: "Should not match severity filter",
            severity: "LOW",
          });
      
        const response = await request(app)
          .get("/incidents?status=IN_PROGRESS&severity=HIGH");
      
        expect(response.status).toBe(200);
      
        expect(response.body.length).toBeGreaterThanOrEqual(1);
      
        expect(
          response.body.every(
            (incident: {
              status: string;
              severity: string;
            }) =>
              incident.status === "IN_PROGRESS" &&
              incident.severity === "HIGH"
          )
        ).toBe(true);
      });
  });
