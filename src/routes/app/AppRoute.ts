import { Router } from 'express'; 
import productRoutes from '../productRoute/ProductRoute';

const AppRouter = Router(); 

AppRouter.use('/products', productRoutes);

export default AppRouter;
