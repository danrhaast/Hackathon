"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentService = void 0;
const incident_reporitory_1 = require("./incident.reporitory");
class IncidentService {
    repository;
    constructor() {
        this.repository = new incident_reporitory_1.IncidentRepository();
    }
    async create(data) {
        return this.repository.create(data);
    }
    async findById(id) {
        return this.repository.findById(id);
    }
    async findAll() {
        return this.repository.findAll();
    }
}
exports.IncidentService = IncidentService;
//# sourceMappingURL=incident.service.js.map