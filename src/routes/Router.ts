import { web } from "../app/configs/Web";
import { testRouter } from "./register_routes/TestRouter";

export function registerRoutes() {
    web.use(testRouter);
}
