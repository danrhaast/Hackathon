import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../src/app";

describe("Health Check", () => {
  it("should return API status", async () => {
    const response = await request(app)
      .get("/health");

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      status: "ok",
      service: "incident-hub",
    });
  });
});

describe("Incident Creation", () => {
  it("should create an incident successfully", async () => {
    const response = await request(app)
      .post("/incidents")
      .send({
        title: "Database connection error",
        description: "The application cannot connect to the database.",
        severity: "HIGH",
      });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      title: "Database connection error",
      description: "The application cannot connect to the database.",
      severity: "HIGH",
      status: "OPEN",
    });

    expect(response.body.id).toBeDefined();
  });

  it("should reject an incident with invalid severity", async () => {
    const response = await request(app)
      .post("/incidents")
      .send({
        title: "Invalid incident",
        description: "This incident should fail validation.",
        severity: "URGENT",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid request data");
  });
});

describe("Incident Listing", () => {
  it("should list all incidents", async () => {
    const response = await request(app)
      .get("/incidents");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should filter incidents by severity", async () => {
    const response = await request(app)
      .get("/incidents?severity=CRITICAL");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    for (const incident of response.body) {
      expect(incident.severity).toBe("CRITICAL");
    }
  });

  it("should filter incidents by status", async () => {
    const response = await request(app)
      .get("/incidents?status=RESOLVED");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    for (const incident of response.body) {
      expect(incident.status).toBe("RESOLVED");
    }
  });

  it("should filter incidents by status and severity", async () => {
    const response = await request(app)
      .get("/incidents?status=IN_PROGRESS&severity=CRITICAL");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    for (const incident of response.body) {
      expect(incident.status).toBe("IN_PROGRESS");
      expect(incident.severity).toBe("CRITICAL");
    }
  });
});

describe("Incident Status Rules", () => {
  it("should update incident status", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Status update test",
        description: "Testing status update",
        severity: "HIGH",
      });

    expect(createResponse.status).toBe(201);

    const incidentId = createResponse.body.id;

    const response = await request(app)
      .patch(`/incidents/${incidentId}/status`)
      .send({
        status: "IN_PROGRESS",
        changedBy: "Test",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("IN_PROGRESS");
  });

  it("should not allow a critical incident to go directly from OPEN to RESOLVED", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Critical incident test",
        description: "Testing critical status rule",
        severity: "CRITICAL",
      });

    expect(createResponse.status).toBe(201);

    const incidentId = createResponse.body.id;

    const response = await request(app)
      .patch(`/incidents/${incidentId}/status`)
      .send({
        status: "RESOLVED",
        changedBy: "Test",
      });

    expect(response.status).toBe(400);

    expect(response.body.message).toBe(
      "Critical incidents must pass through In Progress before being resolved"
    );
  });

  it("should allow a critical incident to go from OPEN to IN_PROGRESS and then RESOLVED", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Critical incident flow test",
        description: "Testing the complete critical incident flow",
        severity: "CRITICAL",
      });

    expect(createResponse.status).toBe(201);

    const incidentId = createResponse.body.id;

    const inProgressResponse = await request(app)
      .patch(`/incidents/${incidentId}/status`)
      .send({
        status: "IN_PROGRESS",
        changedBy: "Test",
      });

    expect(inProgressResponse.status).toBe(200);
    expect(inProgressResponse.body.status).toBe("IN_PROGRESS");

    const resolvedResponse = await request(app)
      .patch(`/incidents/${incidentId}/status`)
      .send({
        status: "RESOLVED",
        changedBy: "Test",
      });

    expect(resolvedResponse.status).toBe(200);
    expect(resolvedResponse.body.status).toBe("RESOLVED");
  });
});

describe("Incident History", () => {
  it("should create history when the incident status changes", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "History test",
        description: "Testing incident history",
        severity: "HIGH",
      });

    expect(createResponse.status).toBe(201);

    const incidentId = createResponse.body.id;

    await request(app)
      .patch(`/incidents/${incidentId}/status`)
      .send({
        status: "IN_PROGRESS",
        changedBy: "Test",
      });

    await request(app)
      .patch(`/incidents/${incidentId}/status`)
      .send({
        status: "RESOLVED",
        changedBy: "Test",
      });

    const response = await request(app)
      .get(`/incidents/${incidentId}`);

    expect(response.status).toBe(200);
    expect(response.body.history).toHaveLength(2);

    expect(response.body.history[0]).toMatchObject({
      previousStatus: "OPEN",
      newStatus: "IN_PROGRESS",
      changedBy: "Test",
    });

    expect(response.body.history[1]).toMatchObject({
      previousStatus: "IN_PROGRESS",
      newStatus: "RESOLVED",
      changedBy: "Test",
    });
  });
});

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

describe("Incident Comments", () => {
  it("should create a comment successfully", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Comment test",
        description: "Testing incident comments",
        severity: "MEDIUM",
      });

    expect(createResponse.status).toBe(201);

    const incidentId = createResponse.body.id;

    const response = await request(app)
      .post(`/incidents/${incidentId}/comments`)
      .send({
        author: "Ana",
        content: "Provider contacted.",
      });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      incidentId,
      author: "Ana",
      content: "Provider contacted.",
    });

    expect(response.body.id).toBeDefined();
    expect(response.body.createdAt).toBeDefined();
  });

  it("should reject a comment without author", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Missing author test",
        description: "Testing comment validation",
        severity: "LOW",
      });

    const incidentId = createResponse.body.id;

    const response = await request(app)
      .post(`/incidents/${incidentId}/comments`)
      .send({
        content: "Comment without author.",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid request data");
  });

  it("should reject a comment without content", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Missing content test",
        description: "Testing comment validation",
        severity: "LOW",
      });

    const incidentId = createResponse.body.id;

    const response = await request(app)
      .post(`/incidents/${incidentId}/comments`)
      .send({
        author: "Ana",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid request data");
  });

  it("should reject an empty comment", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Empty comment test",
        description: "Testing empty comment validation",
        severity: "LOW",
      });

    const incidentId = createResponse.body.id;

    const response = await request(app)
      .post(`/incidents/${incidentId}/comments`)
      .send({
        author: "   ",
        content: "   ",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid request data");
  });

  it("should reject a comment for an incident that does not exist", async () => {
    const response = await request(app)
      .post("/incidents/00000000-0000-0000-0000-000000000000/comments")
      .send({
        author: "Ana",
        content: "This incident does not exist.",
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Incident not found");
  });

  it("should persist the comment in the incident details", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Comment persistence test",
        description: "Testing comment persistence",
        severity: "HIGH",
      });

    const incidentId = createResponse.body.id;

    await request(app)
      .post(`/incidents/${incidentId}/comments`)
      .send({
        author: "Ana",
        content: "Provider contacted.",
      });

    const response = await request(app)
      .get(`/incidents/${incidentId}`);

    expect(response.status).toBe(200);

    expect(response.body.comments).toHaveLength(1);

    expect(response.body.comments[0]).toMatchObject({
      incidentId,
      author: "Ana",
      content: "Provider contacted.",
    });
  });
});

describe("Incident Timeline", () => {
  it("should combine status changes and comments", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Timeline test",
        description: "Testing incident timeline",
        severity: "HIGH",
      });

    expect(createResponse.status).toBe(201);

    const incidentId = createResponse.body.id;

    await request(app)
      .patch(`/incidents/${incidentId}/status`)
      .send({
        status: "IN_PROGRESS",
        changedBy: "Daniel",
      });

    await request(app)
      .post(`/incidents/${incidentId}/comments`)
      .send({
        author: "Ana",
        content: "Provider contacted.",
      });

    await request(app)
      .patch(`/incidents/${incidentId}/status`)
      .send({
        status: "RESOLVED",
        changedBy: "Daniel",
      });

    const response = await request(app)
      .get(`/incidents/${incidentId}/timeline`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(3);

    expect(response.body[0]).toMatchObject({
      type: "STATUS_CHANGE",
      previousStatus: "OPEN",
      newStatus: "IN_PROGRESS",
      author: "Daniel",
    });

    expect(response.body[1]).toMatchObject({
      type: "COMMENT",
      author: "Ana",
      content: "Provider contacted.",
    });

    expect(response.body[2]).toMatchObject({
      type: "STATUS_CHANGE",
      previousStatus: "IN_PROGRESS",
      newStatus: "RESOLVED",
      author: "Daniel",
    });
  });

  it("should return timeline events in chronological order", async () => {
    const createResponse = await request(app)
      .post("/incidents")
      .send({
        title: "Timeline order test",
        description: "Testing chronological timeline",
        severity: "MEDIUM",
      });

    expect(createResponse.status).toBe(201);

    const incidentId = createResponse.body.id;

    await request(app)
      .patch(`/incidents/${incidentId}/status`)
      .send({
        status: "IN_PROGRESS",
        changedBy: "Daniel",
      });

    await request(app)
      .post(`/incidents/${incidentId}/comments`)
      .send({
        author: "Ana",
        content: "Investigating the issue.",
      });

    const response = await request(app)
      .get(`/incidents/${incidentId}/timeline`);

    expect(response.status).toBe(200);

    const dates = response.body.map(
      (event: { date: string }) => new Date(event.date).getTime()
    );

    expect(dates).toEqual([...dates].sort((a, b) => a - b));
  });
});