import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
try {
    dotenv.config();
} catch (error) {
    console.error("Error al cargar las variables de entorno:", error);
    process.exit(1);
}

// Exportar las variables de entorno
export const MONGO_URL = process.env.MONGO_URL;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const SESSION_SECRET = process.env.SESSION_SECRET;
export const PORT = process.env.PORT;
