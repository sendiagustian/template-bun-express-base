import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import rateLimit from "express-rate-limit";
import express, { type Application } from "express";
import { createServer } from "http";
import { swaggerMiddleware } from "../middlewares/SwaggerMiddleware";
import { errorMiddleware } from "../middlewares/ErrorMiddleware";
import { registerRoutes } from "../../routes/Router";
import { timeoutMiddleware } from "../middlewares/TimeoutMiddleware";
import { cacheControlMiddleware } from "../middlewares/CacheControlMiddleware";

export const web: Application = express();
const server = createServer(web);

// Set maximum connections
server.maxConnections = 5000; // Batasi maksimal 1000 koneksi

// Middleware
web.use(express.json()); // Parse JSON bodies
web.use(morgan("tiny")); // Log all requests
web.use(express.urlencoded({ extended: true })); // Parse URL-encoded body
web.use(rateLimit({ windowMs: 1000, max: 1000 })); // Rate limit (windowMs: 1000 = 1 second, max: 1000 = 1000 requests) 1000 request per second
web.use(timeoutMiddleware); // Timeout middleware
web.use(cacheControlMiddleware); // Cache control

// Serve static resources
web.use(express.static("docs")); // Serve the docs folder for swagger

// Serve swagger
web.use("/api/docs", swaggerUi.serve, swaggerMiddleware);

// CORS middleware
web.use(cors());

// Register routes
registerRoutes();

// Error middleware
web.use(errorMiddleware);
