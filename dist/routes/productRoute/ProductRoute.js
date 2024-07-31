"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../../controllers/productController/ProductController"));
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
const productRoutes = (0, express_1.Router)();
productRoutes.post('/', validationMiddleware_1.validateCommonFields, ProductController_1.default.createProduct);
productRoutes.get('/', ProductController_1.default.getAllProducts);
productRoutes.delete('/:id', validationMiddleware_1.validateId, ProductController_1.default.deleteProductById);
productRoutes.get('/count', ProductController_1.default.getProductCount);
exports.default = productRoutes;
