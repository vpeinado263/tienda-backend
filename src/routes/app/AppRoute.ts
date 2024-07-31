import { Router } from 'express'; 
import productRoutes from '../productRoute/ProductRoute';
import uploadRoute from '../uploadRoute/uploadRoute';

const router = Router(); 

console.log('Router instance created successfully.');

router.use('/products', productRoutes);
router.use('/upload', uploadRoute);

export default router;
