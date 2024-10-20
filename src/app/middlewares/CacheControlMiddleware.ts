import type { Request, Response, NextFunction } from "express";

export function cacheControlMiddleware(_req: Request, res: Response, next: NextFunction) {
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=0, must-revalidate");
    res.setHeader("Expires", new Date(Date.now() + 500).toUTCString()); // Set expire ke 500ms ke depan
    next();
}
