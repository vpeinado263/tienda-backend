import { Router } from 'express';
import express from 'express';
import { welcomeMiddleware } from '../../middlewares/welcomeMiddlewares';
import productRoutes from '../productRoute/ProductRoute';
import userRoutes from '../user/UserRoute';
import sessionRoutes from '../sessionRoute/SessionRoute';

const appRoute = Router();

// Middleware para analizar el cuerpo de la solicitud como JSON
appRoute.use(express.json());

// Ruta principal
appRoute.get('/', welcomeMiddleware);

// Rutas para productos, usuarios y sesión
appRoute.use('/products', productRoutes);
appRoute.use('/users', userRoutes);
appRoute.use('/session', sessionRoutes);

export default appRoute;