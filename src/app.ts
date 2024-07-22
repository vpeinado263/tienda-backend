import express from 'express';
import errorHandler from '../src/middlewares/errorHandler'; // Asegúrate de que la ruta sea correcta
import { sessionConfig } from './settings/SessionConfig'; // Asegúrate de que la ruta y la exportación sean correctas
import connectDB from './scripts/initDB'; // Asegúrate de que la ruta y la exportación sean correctas
import productRoute from './routes/productRoute/ProductRoute'; // Asegúrate de que la ruta sea correcta
import userRoute from './routes/user/UserRoute'; // Asegúrate de que la ruta sea correcta
import sessionRoutes from './routes/sessionRoute/SessionRoute'; // Asegúrate de que la ruta sea correcta
import appRoute from './routes/app/AppRoute'; // Asegúrate de que la ruta sea correcta
import cors from 'cors';

const app = express();

app.use(sessionConfig);

connectDB();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Asegúrate de que esto sea necesario o reemplázalo por tu dominio en producción
  optionsSuccessStatus: 200
}));

app.use(appRoute);

app.use('/api/products', productRoute);

app.use('/api/users', userRoute);

app.use('/api/session', sessionRoutes);

app.use(errorHandler);

export default app;
