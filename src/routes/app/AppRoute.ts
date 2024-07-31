import { Router } from 'express';
import productRoutes from '../productRoute/ProductRoute';
import uploadRoute from '../uploadRoute/uploadRoute'

const appRoute = Router();

appRoute.use('/api/products', productRoutes);

appRoute.use('/api', uploadRoute)


export default appRoute;