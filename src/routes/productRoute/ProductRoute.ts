import { Router } from 'express';
import productController from '../../controllers/productController/ProductController';
import { validateCommonFields, validateId } from '../../middlewares/validationMiddleware';
import { check, body } from 'express-validator';
import { isValidUrl } from '../../utils/validators'; 

const productRoutes = Router();

productRoutes.post('/', validateCommonFields, productController.createProduct);

productRoutes.get('/', productController.getAllProducts);

productRoutes.delete('/:id', validateId, productController.deleteProductById);

productRoutes.put(
  '/:id',
  [
    ...validateId,
    ...validateCommonFields,
    body('imageUrls')
      .optional()
      .isArray({ min: 1 })
      .withMessage('Las URLs de las imágenes deben ser un arreglo con al menos una URL.')
      .custom((value) => {
        if (value && value.some((url: string) => !isValidUrl(url))) {
          throw new Error('Una o más URLs de imagen no son válidas.');
        }
        return true;
      }),
  ],
  productController.updateProductById
);

productRoutes.get('/count', productController.getProductCount);

export default productRoutes;
