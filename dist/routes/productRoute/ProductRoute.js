"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../../controllers/productController/ProductController"));
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const express_validator_1 = require("express-validator");
const validators_1 = require("../../utils/validators");
const productRoutes = (0, express_1.Router)();
productRoutes.post('/', validationMiddleware_1.validateCommonFields, ProductController_1.default.createProduct);
productRoutes.get('/', ProductController_1.default.getAllProducts);
productRoutes.delete('/:id', validationMiddleware_1.validateId, ProductController_1.default.deleteProductById);
productRoutes.put('/:id', [
    ...validationMiddleware_1.validateId,
    ...validationMiddleware_1.validateCommonFields,
    (0, express_validator_1.body)('imageUrls')
        .optional()
        .isArray({ min: 1 })
        .withMessage('Las URLs de las imágenes deben ser un arreglo con al menos una URL.')
        .custom((value) => {
        if (value && value.some((url) => !(0, validators_1.isValidUrl)(url))) {
            throw new Error('Una o más URLs de imagen no son válidas.');
        }
        return true;
    }),
], ProductController_1.default.updateProductById);
productRoutes.get('/count', ProductController_1.default.getProductCount);
exports.default = productRoutes;
