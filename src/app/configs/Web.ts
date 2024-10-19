import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import express, { type Application } from "express";
import { swaggerMiddleware } from "../middlewares/SwaggerMiddleware";
import { errorMiddleware } from "../middlewares/ErrorMiddleware";
import { registerRoutes } from "../../routes/Router";
import rateLimit from "express-rate-limit";
import { timeoutMiddleware } from "../middlewares/TimeoutMiddleware";

export const web: Application = express();

// Middleware
web.use(express.json()); // Parse JSON bodies
web.use(morgan("tiny")); // Log all requests
web.use(express.urlencoded({ extended: true })); // Parse URL-encoded body
web.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 500 })); // Rate limit
web.use(timeoutMiddleware); // Timeout middleware

// Serve static resources
web.use(express.static("docs")); // Serve the docs folder for swagger

// Serve swagger
web.use("/api/docs", swaggerUi.serve, swaggerMiddleware);

web.use(cors());
// Register routes
registerRoutes();

// Error middleware
web.use(errorMiddleware);
