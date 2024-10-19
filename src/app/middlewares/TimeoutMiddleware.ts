import type { Request, Response, NextFunction } from "express";
import type { ErrorResponse } from "./response/ErrorResponse";

// Timeout middleware
export const timeoutMiddleware = (_req: Request, res: Response, next: NextFunction) => {
    const statusCode = 408;
    const response: ErrorResponse = {
        status: statusCode,
        errors: "Request timeout"
    };

    res.setTimeout(5000, () => {
        // Timeout 5 detik
        res.status(statusCode).send(response);
    });
    next();
};
