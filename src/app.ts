import express from 'express';
import cors from 'cors';
import { sessionConfig } from './config/SessionConfig';
import connectDB from './scripts/initDB';
import appRoute from './routes/app/AppRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);
connectDB();

app.use(cors({
  origin: ['http://localhost:3000', 'https://tienda-x--swart.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use('/api', appRoute);

export default app;
