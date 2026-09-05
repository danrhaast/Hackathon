"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
const app_errors_1 = require("../shared/errors/app-errors");
function errorMiddleware(error, _req, res, _next) {
    if (error instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "Invalid request data",
            errors: error.issues,
        });
    }
    if (error instanceof app_errors_1.AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }
    console.error(error);
    return res.status(500).json({
        message: "Internal server error",
    });
}
//# sourceMappingURL=error.middleware.js.map