import { type Connection, createPool, type ResultSetHeader } from "mysql2/promise";
import { logger } from "../utils/Logging";
import { decode } from "../utils/Decrypt";

async function connectToDatabase(): Promise<Connection> {
    if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_NAME) {
        throw new Error("Database configuration not found");
    }

    const dbHost = decode(process.env.DB_HOST!);
    const dbPort = decode(process.env.DB_PORT!);
    const dbUser = decode(process.env.DB_USER!);
    const dbPass = decode(process.env.DB_PASS!);

    if (dbHost === "" || dbPort === "" || dbUser === "" || dbPass === "") {
        throw new Error("Secret key incorect or Database env not found");
    }

    const connection = createPool({
        connectionLimit: 5,
        host: dbHost,
        port: parseInt(dbPort),
        user: dbUser,
        password: dbPass,
        database: process.env.DB_NAME!
        // timezone: "Asia/Jakarta",
    });
    return connection;
}
// FOR SELECT QUERY DATABASE
export async function getQuery(arg: { query: string; type: "list" | "object"; params?: any[] }): Promise<any> {
    let connection;
    const valueParams = arg.params?.filter((item) => item !== undefined);

    try {
        connection = await connectToDatabase();
        const [rows, _field] = await connection.query(arg.query, valueParams);
        const response = rows as any;
        if (arg.type === "list") {
            return response;
        } else {
            return response[0];
        }
    } catch (error) {
        logger.error("Gagal menjalankan get query:", error);
        throw new Error(`${error}`.replace(process.env.DB_NAME || "database", "database"));
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
// FOR INSERT, UPDATE, DELETE QUERY DATABASE
export async function exeQuery(arg: { query: string; params?: any[] }): Promise<ResultSetHeader> {
    let connection;
    const valueParams = arg.params?.filter((item) => item !== undefined);

    try {
        connection = await connectToDatabase();
        const [rows, _field] = await connection.query(arg.query, valueParams);
        return rows as ResultSetHeader;
    } catch (error) {
        logger.error("Gagal menjalankan exequery:", error);
        throw new Error(`${error}`.replace(process.env.DB_NAME || "database", "database"));
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
