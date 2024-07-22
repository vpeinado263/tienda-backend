"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../../controllers/productController/ProductController"));
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const express_validator_1 = require("express-validator");
const productRoutes = (0, express_1.Router)();
// Definir rutas
productRoutes.post('/', validationMiddleware_1.validateCommonFields, ProductController_1.default.createProduct);
productRoutes.get('/', ProductController_1.default.getAllProducts);
productRoutes.delete('/:id', validationMiddleware_1.validateId, ProductController_1.default.deleteProductById);
productRoutes.put('/:id', [...validationMiddleware_1.validateId, ...validationMiddleware_1.validateCommonFields,
    (0, express_validator_1.check)('imageUrl').optional().isURL().withMessage('La URL de la imagen no es válida')], ProductController_1.default.updateProductById);
// Nueva ruta para obtener el conteo de productos
productRoutes.get('/count', ProductController_1.default.getProductCount);
exports.default = productRoutes;
