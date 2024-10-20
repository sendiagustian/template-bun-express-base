import type { ErrorResponse } from "./response/ErrorResponse";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("X-API-TOKEN");
    const appKey = req.get("APP-API-KEY");

    if (token) {
        next();
        return;
        // const valid = await UserService.checkToken(token);
        // if (valid) {
        //     next();
        //     return;
        // } else {
        //     const message: string = "Incorrect authentication";
        //     const response: ErrorResponse = {
        //         status: 401,
        //         errors: message
        //     };

        //     res.status(401).json(response).end();
        // }
    } else {
        if (appKey) {
            if (appKey === "#Surat55ayat60") {
                next();
                return;
            } else {
                const message: string = "Incorrect authentication";
                const response: ErrorResponse = {
                    status: 401,
                    errors: message
                };

                res.status(401).json(response).end();
            }
        } else {
            const message: string = "Unauthorized";
            const response: ErrorResponse = {
                status: 401,
                errors: message
            };

            res.status(401).json(response).end();
        }
    }
};
