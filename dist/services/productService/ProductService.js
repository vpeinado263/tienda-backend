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
function isValidUrl(url) {
    // Expresión regular para validar URLs
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
}
class ProductService {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductModel_1.ProductModel.find().lean();
                // Verificar la URL de la imagen en cada producto
                products.forEach(product => {
                    if (product.imageUrl && typeof product.imageUrl === 'string' && isValidUrl(product.imageUrl)) {
                        // console.log('La URL de la imagen es válida para el producto:', product);
                    }
                    else {
                        // console.error('La URL de la imagen no es válida para el producto:', product);
                        // Puedes lanzar un error, registrar un mensaje de advertencia, o realizar alguna otra acción dependiendo de tus necesidades
                    }
                });
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
            try {
                const newProduct = yield ProductModel_1.ProductModel.create(productData);
                return newProduct;
            }
            catch (error) {
                throw new Error('Error al crear el producto.');
            }
        });
    }
    updateProductById(_id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield ProductModel_1.ProductModel.findById(_id);
                if (!existingProduct) {
                    return null;
                }
                if (productData.name) {
                    existingProduct.name = productData.name;
                }
                if (productData.description) {
                    existingProduct.description = productData.description;
                }
                const updatedProduct = yield existingProduct.save();
                return updatedProduct;
            }
            catch (error) {
                throw new Error('Error updating product by ID.');
            }
        });
    }
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
                console.error('Error deleting product:', error.message);
                throw new Error('Error deleting product: ' + error.message);
            }
        });
    }
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
    searchProducts(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Aquí implementa la lógica para buscar productos basados en el término de búsqueda
                // Puedes utilizar tu lógica de búsqueda existente o implementar una nueva aquí
                // Por ejemplo:
                const products = yield ProductModel_1.ProductModel.find({ name: { $regex: searchTerm, $options: 'i' } }).lean();
                return products;
            }
            catch (error) {
                console.error('Error al buscar productos:', error);
                throw new Error('Error al buscar productos.');
            }
        });
    }
}
;
exports.default = new ProductService();
