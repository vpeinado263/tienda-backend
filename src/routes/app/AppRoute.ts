import { Router } from 'express';
import productRoutes from '../productRoute/ProductRoute';

const appRoute = Router();

appRoute.use('/api/products', productRoutes);


export default appRoute;