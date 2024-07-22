import express from 'express';
import errorHandler from '../src/middlewares/errorHandler'; 
import { sessionConfig } from './settings/SessionConfig';
import connectDB from './scripts/initDB'; 
import productRoute from './routes/productRoute/ProductRoute'; 
import userRoute from './routes/user/UserRoute'; 
import sessionRoutes from './routes/sessionRoute/SessionRoute'; 
import appRoute from './routes/app/AppRoute'; 


const app = express();

app.use(sessionConfig);

connectDB();

app.use(express.json());

app.use(appRoute);

app.use('/api/products', productRoute);

app.use('/api/users', userRoute);

app.use('/api/session', sessionRoutes);

app.use(errorHandler);

export default app;
