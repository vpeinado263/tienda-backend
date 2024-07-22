import {  ProductModel, Product  } from '../../models/productModel/ProductModel';

function isValidUrl(url: string): boolean {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

class ProductService {
  
  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await ProductModel.find().lean();
  
      products.forEach(product => {
        if (product.imageUrl && typeof product.imageUrl === 'string' && isValidUrl(product.imageUrl)) {
        }
      });      
  
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw new Error('Error al obtener los productos.');
    }
  }
  

async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const newProduct = await ProductModel.create(productData);
      return newProduct; 
    } catch (error) {
      throw new Error('Error al crear el producto.');
    }
  }

async updateProductById(_id: string, productData: Partial<Product>): Promise<Product | null> {
    try {
        
        const existingProduct = await ProductModel.findById(_id);
        if (!existingProduct) {
            return null; 
        }

        if (productData.name) {
            existingProduct.name = productData.name;
        }
        if (productData.description) {
            existingProduct.description = productData.description;
        }
        
        const updatedProduct = await existingProduct.save();
        return updatedProduct;
    } catch (error) {
        throw new Error('Error updating product by ID.');
    }
}

async deleteProductById(productId: string): Promise<void | any> {
    try {
        console.log('Deleting product with ID:', productId);
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        console.log('Deleted product:', deletedProduct);
        
        if (!deletedProduct) {
            throw new Error('Product not found');
        }

        return { success: true, deletedProduct };
    } catch (error: any) {
        console.error('Error deleting product:', error.message);
        throw new Error('Error deleting product: ' + error.message);
    }
}

async getProductCount(): Promise<number> {
  try {
    const count = await ProductModel.countDocuments().exec();
    return count;
  } catch (error) {
    console.error('Error al obtener la cantidad de productos:', error);
    throw error;
  }
}

async searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    const products = await ProductModel.find({ name: { $regex: searchTerm, $options: 'i' } }).lean();
    return products;
  } catch (error) {
    console.error('Error al buscar productos:', error);
    throw new Error('Error al buscar productos.');
  }
}

};

export default new ProductService();
