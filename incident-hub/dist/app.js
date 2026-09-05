"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const incident_routes_1 = require("./modules/incidents/incident.routes");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/health", (_req, res) => {
    return res.status(200).json({
        status: "ok",
        service: "incident-hub",
    });
});
app.use("/incidents", incident_routes_1.incidentRoutes);
//# sourceMappingURL=app.js.map