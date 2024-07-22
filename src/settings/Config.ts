import dotenv from 'dotenv';

try {
    dotenv.config();
} catch (error) {
    console.error("Error al cargar las variables de entorno:", error);
    process.exit(1);
}

export const MONGO_URL = process.env.MONGO_URL