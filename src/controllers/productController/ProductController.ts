import { Request, Response } from 'express';
import ProductService from '../../services/productService/ProductService';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (error: any) {
    console.error('Error al obtener los productos:', error.message);
    res.status(500).json({ success: false, error: 'Error al obtener los productos' });
  }
};

const getProductCount = async (req: Request, res: Response) => {
  try {
    const count = await ProductService.getProductCount();
    res.status(200).json({ count });
  } catch (error: any) {
    console.error('Error al obtener la cantidad de productos:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { _id, name, description, price, imageUrl, quantity } = req.body;
    const newProduct = await ProductService.createProduct({ _id, name, description, price, imageUrl, quantity });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error: any) {
    console.error('Error al crear el producto', error.message);
    res.status(422).json({ success: false, error: 'Error al crear el producto' });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, name, description, price, imageUrl, quantity } = req.body;

  try {
    const updatedProduct = await ProductService.updateProductById(id, { _id, name, description, price, imageUrl, quantity });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }

    res.json({ success: true, data: updatedProduct });
  } catch (error: any) {
    console.error('Error al actualizar el producto:', error.message);
    res.status(422).json({ success: false, error: 'Error al actualizar el producto' });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedProduct = await ProductService.deleteProductById(id);

    if (deletedProduct === null) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }

    res.json({ success: true, data: deletedProduct });
  } catch (error: any) {
    console.error('Error al eliminar el producto:', error.message);
    res.status(500).json({ success: false, error: 'Error al eliminar el producto' });
  }
};

export default {
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductCount
};










