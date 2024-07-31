import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Exportar las variables de entorno
export const MONGO_URL = process.env.MONGO_URL || '';
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL || '';
export const SECRET_KEY = process.env.SECRET_KEY || '';
export const PORT = process.env.PORT || 8080;
