import admin from "firebase-admin";
import { logger } from "../utils/Logging";

const serviceAccount = require(process.env.FIREBASE_KEY!); // Path ke file kunci Anda

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const firestore = admin.firestore();

// Fungsi untuk menambahkan data baru
export async function fsCreate(collection: string, data: FirebaseFirestore.DocumentData) {
    try {
        const refDoc = firestore.collection(collection).doc();
        await refDoc.set(data, { merge: true }); // Gunakan set() untuk membuat atau menggabungkan data
        logger.info("Data berhasil ditambahkan!");
    } catch (error) {
        logger.info("Error saat menambahkan data:", error);
        throw error; // Melempar error untuk ditangani di tempat pemanggilan
    }
}

// Fungsi untuk update data
export async function fsUpdate(collection: string, documentId: string, data: FirebaseFirestore.DocumentData) {
    try {
        const refDoc = firestore.collection(collection).doc(documentId);
        await refDoc.update(data); // Gunakan update() untuk mengubah data
        logger.info("Data berhasil diupdate!");
    } catch (error) {
        logger.info("Error saat mengubah data:", error);
        throw error;
    }
}

// Fungsi untuk mengambil data
export async function fsGet(documentId: string, collection: string): Promise<FirebaseFirestore.DocumentSnapshot | null> {
    try {
        const refDoc = firestore.collection(collection).doc(documentId);
        const docSnap = await refDoc.get(); // Gunakan get() untuk mengambil data
        if (docSnap.exists) {
            return docSnap;
        } else {
            logger.info("Dokumen tidak ditemukan");
            return null;
        }
    } catch (error) {
        logger.info("Error saat mengambil data:", error);
        throw error;
    }
}

export async function fsGetAll(collection: string): Promise<FirebaseFirestore.QuerySnapshot | null> {
    try {
        const refCollection = firestore.collection(collection);
        const collectionSnap = await refCollection.get(); // Gunakan get() untuk mengambil semua data
        if (collectionSnap.empty) {
            logger.info("Koleksi kosong");
            return null;
        } else {
            return collectionSnap;
        }
    } catch (error) {
        logger.info("Error saat mengambil data:", error);
        throw error;
    }
}
