import express from 'express';
import cors from 'cors';
import { sessionConfig } from './settings/SessionConfig';
import connectDB from './scripts/initDB'; 
import productRoute from './routes/productRoute/ProductRoute'; 
import userRoute from './routes/user/UserRoute'; 
import sessionRoutes from './routes/sessionRoute/SessionRoute'; 
import appRoute from './routes/app/AppRoute'; 


const app = express();

app.use(cors({
    origin: 'https://tienda-x-72hf0t03n-vhp-projects-694c293c.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(sessionConfig);

connectDB();

app.use(express.json());

app.use(appRoute);

app.use('/products', productRoute);

app.use('/users', userRoute);

app.use('/session', sessionRoutes);

export default app;
