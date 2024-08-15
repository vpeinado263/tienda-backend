import { Router } from 'express'; 
import productRoutes from '../productRoute/ProductRoute';
import userRoutes from '../userRoute/UserRoute';

const AppRouter = Router(); 

AppRouter.use('/products', productRoutes);
AppRouter.use('/users', userRoutes);

export default AppRouter;
