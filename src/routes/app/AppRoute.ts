import { Router } from 'express';
import productRoutes from '../productRoute/ProductRoute';
import userRoutes from '../user/UserRoute';
import sessionRoutes from '../sessionRoute/SessionRoute';

const appRoute = Router();

appRoute.use('/api/products', productRoutes);
appRoute.use('/api/users', userRoutes);
appRoute.use('/api/session', sessionRoutes);

export default appRoute;