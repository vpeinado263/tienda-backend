import { Router } from 'express'; 
import productRoutes from '../productRoute/ProductRoute';

const AppRouter = Router(); 

console.log('Router instance created successfully.');

AppRouter.use('/products', productRoutes);

export default AppRouter;
