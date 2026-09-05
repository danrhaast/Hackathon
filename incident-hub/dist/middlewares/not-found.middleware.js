"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = notFoundMiddleware;
function notFoundMiddleware(_req, res) {
    return res.status(404).json({
        message: "Route not found",
    });
}
//# sourceMappingURL=not-found.middleware.js.map