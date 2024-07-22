import { Router } from 'express';
import productController from '../../controllers/productController/ProductController';
import { validateCommonFields, validateId } from '../../middlewares/validationMiddleware';
import { check } from 'express-validator';

const productRoutes = Router();

// Definir rutas
productRoutes.post('/', validateCommonFields, productController.createProduct);
productRoutes.get('/', productController.getAllProducts);
productRoutes.delete('/:id', validateId, productController.deleteProductById);
productRoutes.put('/:id', [...validateId, ...validateCommonFields,
  check('imageUrl').optional().isURL().withMessage('La URL de la imagen no es válida')],
  productController.updateProductById);

// Nueva ruta para obtener el conteo de productos
productRoutes.get('/count', productController.getProductCount);

export default productRoutes;
