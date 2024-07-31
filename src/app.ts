import express from 'express';
import cors from 'cors';
import { sessionConfig } from './config/SessionConfig';
import connectDB from './scripts/initDB';
import productRoute from './routes/productRoute/ProductRoute';
import uploadRoute from './routes/uploadRoute/uploadRoute';

const app = express();

app.use(express.json()); // Permite analizar JSON
app.use(express.urlencoded({ extended: true })); // Permite analizar datos URL encoded

app.use(sessionConfig);
connectDB();

app.use(cors({
  origin: ['http://localhost:3000', 'https://tienda-x--swart.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use('/api/products', productRoute);
app.use('/api', uploadRoute); 

export default app;
