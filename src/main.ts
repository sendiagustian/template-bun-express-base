import os from "os";
import cluster from "cluster";
import { web } from "./app/configs/Web";
import { logger } from "./app/utils/Logging";

const host =
    process.env.MODE == "production"
        ? `http://127.0.0.1:${process.env.PORT}`
        : process.env.BASE_URL + ":" + process.env.PORT || "http://127.0.0.1:5050";

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
    web.listen(process.env.PORT, () => logger.info(`Server is running on ${host}/api/docs`));
}
