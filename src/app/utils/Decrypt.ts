import CryptoJS from "crypto-js";

export function decode(encryptedValue: string): string {
    const SECRET_KEY = process.env.SECRET_KEY!;
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}
