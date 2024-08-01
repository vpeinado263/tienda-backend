import { Router } from 'express'; 
import productRoutes from '../productRoute/ProductRoute';
import uploadRoute from '../uploadRoute/uploadRoute';

const AppRouter = Router(); 

console.log('Router instance created successfully.');

AppRouter.use('/products', productRoutes);
AppRouter.use('/api', uploadRoute);

export default AppRouter;
