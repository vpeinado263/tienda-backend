"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductModel_1 = require("../../models/productModel/ProductModel");
const validators_1 = require("../../utils/validators");
class ProductService {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductModel_1.ProductModel.find().lean();
                return products;
            }
            catch (error) {
                console.error('Error al obtener los productos:', error);
                throw new Error('Error al obtener los productos.');
            }
        });
    }
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (productData.imageUrls) {
                productData.imageUrls.forEach(url => {
                    if (url && !(0, validators_1.isValidUrl)(url)) {
                        throw new Error('Una o más URLs de imagen no son válidas.');
                    }
                });
            }
            try {
                const newProduct = yield ProductModel_1.ProductModel.create(productData);
                return newProduct;
            }
            catch (error) {
                throw new Error('Error al crear el producto.');
            }
        });
    }
    // Eliminar un producto por ID
    deleteProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Deleting product with ID:', productId);
                const deletedProduct = yield ProductModel_1.ProductModel.findByIdAndDelete(productId);
                console.log('Deleted product:', deletedProduct);
                if (!deletedProduct) {
                    throw new Error('Product not found');
                }
                return { success: true, deletedProduct };
            }
            catch (error) {
                console.error('Error al eliminar el producto:', error.message);
                throw new Error('Error al eliminar el producto: ' + error.message);
            }
        });
    }
    // Obtener la cantidad total de productos
    getProductCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield ProductModel_1.ProductModel.countDocuments().exec();
                return count;
            }
            catch (error) {
                console.error('Error al obtener la cantidad de productos:', error);
                throw error;
            }
        });
    }
}
exports.default = new ProductService();
