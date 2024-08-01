import express from 'express';
import cors from 'cors';
import connectDB from './scripts/initDB';
import AppRoute from './routes/app/AppRoute';
import uploadRoute from './routes/uploadRoute/uploadRoute'; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(cors({
  origin: ['http://localhost:3000', 'https://tienda-x--swart.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use('/api', AppRoute);
app.use('/api', uploadRoute); 

export default app;
