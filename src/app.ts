import express from 'express';
import cors from 'cors';
import { sessionConfig } from './settings/SessionConfig';
import connectDB from './scripts/initDB'; 
import productRoute from './routes/productRoute/ProductRoute'; 
import userRoute from './routes/user/UserRoute'; 
import sessionRoutes from './routes/sessionRoute/SessionRoute'; 
import appRoute from './routes/app/AppRoute'; 

const app = express();

// Configura CORS para permitir solicitudes desde localhost y otros dominios
app.use(cors({
    origin: ['http://localhost:3000', 'https://tienda-x--swart.vercel.app'], // Agrega aquí tus dominios
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(sessionConfig);

connectDB();

app.use(express.json());

app.use(appRoute);

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/session', sessionRoutes);

export default app;

