import express from 'express';
import cors from 'cors';
import { sessionConfig } from './settings/SessionConfig';
import connectDB from './scripts/initDB'; 
import productRoute from './routes/productRoute/ProductRoute';  
import appRoute from './routes/app/AppRoute'; 

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'https://tienda-x--swart.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(sessionConfig);

connectDB();

app.use(express.json());

app.use(appRoute);

app.use('/api/products', productRoute);

export default app;

