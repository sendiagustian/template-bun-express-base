import winston from "winston";

// Custom formatter untuk menangani object logging
const customObjectFormatter = winston.format((info) => {
    // Jika argumen berupa objek, stringify seluruh isinya
    if (typeof info.message === "object") {
        info.message = JSON.stringify(info.message, null, 2); // Pretty-print dengan indentasi
    }
    return info;
});

export const logger = winston.createLogger({
    level: "info", // Default level (bisa diubah)
    format: winston.format.combine(
        customObjectFormatter(), // Formatter untuk objek
        winston.format.timestamp(), // Menambahkan timestamp pada setiap log
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`; // Format output log
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(), // Warna berdasarkan level log
                winston.format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                })
            )
        }),
        new winston.transports.File({
            filename: "logs/errors.log",
            level: "error", // Hanya log level error yang disimpan di file
            format: winston.format.combine(
                customObjectFormatter(),
                winston.format.timestamp(),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                })
            )
        })
    ]
});
