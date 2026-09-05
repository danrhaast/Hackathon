import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../src/app";

describe("Incident Dashboard", () => {
    it("should return incident statistics", async () => {
      const beforeResponse = await request(app)
        .get("/incidents/dashboard");
  
      expect(beforeResponse.status).toBe(200);
  
      const before = beforeResponse.body;
  
      const createResponse = await request(app)
        .post("/incidents")
        .send({
          title: "Dashboard test incident",
          description: "Testing dashboard statistics",
          severity: "CRITICAL",
        });
  
      expect(createResponse.status).toBe(201);
  
      const afterResponse = await request(app)
        .get("/incidents/dashboard");
  
      expect(afterResponse.status).toBe(200);
  
      const after = afterResponse.body;
  
      expect(after.total).toBe(before.total + 1);
      expect(after.open).toBe(before.open + 1);
      expect(after.critical).toBe(before.critical + 1);
    });
  });