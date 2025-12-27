import { Request, Response } from 'express';
import ProductService from '../../services/productService/ProductService0-';

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
    const count = await ProductService.countProducts();
    res.status(200).json({ success: true, count });
  } catch (error: any) {
    console.error('Error al obtener la cantidad de productos:', error.message);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrls, quantity } = req.body;

    const newProduct = await ProductService.createProduct({
      name,
      description,
      price,
      imageUrls,
      quantity
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error: any) {
    console.error('Error al crear el producto', error.message);
    res.status(422).json({ success: false, error: 'Error al crear el producto' });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await ProductService.deleteProduct(id);

    if (!result.success) {
      return res.status(404).json({ success: false, error: 'Producto no encontrado' });
    }

    res.json({ success: true, data: result.deletedProduct });
  } catch (error: any) {
    console.error('Error al eliminar el producto:', error.message);
    res.status(500).json({ success: false, error: 'Error al eliminar el producto' });
  }
};

export default {
  getAllProducts,
  createProduct,
  deleteProductById,
  getProductCount
};
