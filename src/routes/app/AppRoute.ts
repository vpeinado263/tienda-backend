import { Router } from 'express';
import express from 'express';
import productRoutes from '../productRoute/ProductRoute';
import userRoutes from '../user/UserRoute';
import sessionRoutes from '../sessionRoute/SessionRoute';

const appRoute = Router();

appRoute.use(express.json());

appRoute.use('/products', productRoutes);
appRoute.use('/users', userRoutes);
appRoute.use('/session', sessionRoutes);

export default appRoute;