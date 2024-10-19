import CryptoJS from "crypto-js";
import { logger } from "./Logging";

const secret = process.env.SECRET_KEY;

/**
 * Fungsi untuk melakukan encoding dengan CriptoJS
 * Buat variabel dengan nilai dari file .env
 * DB_HOST="value";
 * DB_PORT="value";
 * DB_USER="value";
 * DB_PASS="value";
 *
 * Jalankan script "bun run src/app/utils/Encrypt.ts" untuk melakukan encoding
 * Value yang keluar dari console adalah hasil encoding dari variabel yang ada
 * Update nilai variabel di file .env dengan hasil encoding
 */

// Membaca variabel dari file .env
const dbHost = process.env.DB_HOST || "";
const dbPort = process.env.DB_PORT || "";
const dbUser = process.env.DB_USER || "";
const dbPass = process.env.DB_PASS || "";

function encode(value: string): string {
    if (!secret) {
        logger.error("SECRET_KEY tidak ditemukan");
    }

    return CryptoJS.AES.encrypt(value, secret!).toString();
}

function encodeCredentials() {
    try {
        if (!secret) {
            logger.error("SECRET_KEY tidak ditemukan");
        } else {
            // Encode credential ke bentuk Base64
            const encodedHost = encode(dbHost);
            const encodedPort = encode(dbPort);
            const encodedUser = encode(dbUser);
            const encodedPass = encode(dbPass);

            logger.info(`Encoded Host: ${encodedHost}`);
            logger.info(`Encoded Port: ${encodedPort}`);
            logger.info(`Encoded User: ${encodedUser}`);
            logger.info(`Encoded Pass: ${encodedPass}`);
            logger.info("Credentials encoded and truncated successfully");
        }
    } catch (err) {
        logger.error(`Error dalam encoding credential: ${err}`);
    }
}

// Panggil fungsi untuk encoding
encodeCredentials();
