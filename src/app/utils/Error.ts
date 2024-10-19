import { ZodError } from "zod";
import type { NextFunction } from "express";
import type { ErrorResponse } from "../middlewares/response/ErrorResponse";

export class ServiceError extends Error {
    constructor(
        public status: number,
        public message: string
    ) {
        super(message);
        status;
    }
}

export function erroHandle(error: any, next: NextFunction): ErrorResponse {
    if (error instanceof ZodError) {
        // Handle ZodError
        const message = error.issues.map((issue) => `${issue.message} in field ${issue.path.join(".")}`).join(" & ");

        const errorResponse: ErrorResponse = {
            status: 400,
            errors: message
        };

        return errorResponse;
    } else if (error instanceof ServiceError) {
        // Handle custom error
        const message = error.message;

        const errorResponse: ErrorResponse = {
            status: error.status,
            errors: message
        };

        return errorResponse;
    } else {
        throw next(error);
    }
}
