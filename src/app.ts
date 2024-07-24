import express from 'express';
import cors from 'cors';
import { sessionConfig } from './settings/SessionConfig';
import connectDB from './scripts/initDB'; 
import appRoute from './routes/app/AppRoute'; // Importa la ruta centralizada

const app = express();

// Configuración de CORS
app.use(cors);

// Configuración de sesiones
app.use(sessionConfig);

// Conexión a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas definidas en appRoute
app.use('/api', appRoute); // Prefijo /api para todas las rutas

export default app;
