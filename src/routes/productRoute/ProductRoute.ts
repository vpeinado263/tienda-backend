import { Router } from 'express';
import productController from '../../controllers/productController/ProductController';
import { validateCommonFields, validateId } from '../../middlewares/validationMiddleware';

const productRoutes = Router();

productRoutes.post('/', validateCommonFields, productController.createProduct);

productRoutes.get('/', productController.getAllProducts);

productRoutes.delete('/:id', validateId, productController.deleteProductById);

productRoutes.get('/count', productController.getProductCount);

export default productRoutes;
