import os from "os";
import cluster from "cluster";
import { web } from "./app/configs/Web";
import { logger } from "./app/utils/Logging";

const base = process.env.BASE_URL || "http://127.0.0.1";
const port = process.env.PORT || 3000;

if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, _code, _signal) => {
        logger.error(`Worker ${worker.process.pid} died. Starting a new worker...`);
        cluster.fork(); // Memulai ulang worker yang mati
    });
} else {
    web.listen(port, () => logger.info(`Server is running on ${base}:${port}/api/docs`));
}
