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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../../services/productService/ProductService"));
//controlador para obtener todos los productos
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield ProductService_1.default.getAllProducts();
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.error('Error al obtener los productos:', error.message);
        res.status(500).json({ success: false, error: 'Error al obtener los productos' });
    }
});
//controlador para contabilizar la cantidad de productos
const getProductCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield ProductService_1.default.getProductCount();
        res.status(200).json({ count });
    }
    catch (error) {
        console.error('Error al obtener la cantidad de productos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
//controlaor para crear un producto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, description, price, imageUrls, quantity } = req.body;
        const newProduct = yield ProductService_1.default.createProduct({ _id, name, description, price, imageUrls, quantity });
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        console.error('Error al crear el producto', error.message);
        res.status(422).json({ success: false, error: 'Error al crear el producto' });
    }
});
//controlador para eliminar un producto segun el ID
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedProduct = yield ProductService_1.default.deleteProductById(id);
        if (deletedProduct === null) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: deletedProduct });
    }
    catch (error) {
        console.error('Error al eliminar el producto:', error.message);
        res.status(500).json({ success: false, error: 'Error al eliminar el producto' });
    }
});
exports.default = {
    getAllProducts,
    createProduct,
    deleteProductById,
    getProductCount
};
