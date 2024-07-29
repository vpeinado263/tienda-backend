import { Router } from 'express';
import productRoutes from '../productRoute/ProductRoute';
import userRoutes from '../user/UserRoute';


const appRoute = Router();

appRoute.use('/api/products', productRoutes);
appRoute.use('/api/users', userRoutes);


export default appRoute;