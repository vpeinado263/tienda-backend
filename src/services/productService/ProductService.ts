import { ProductModel, Product } from '../../models/productModel/ProductModel';
import { isValidUrl } from '../../utils/validators';


class ProductService {
  
  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await ProductModel.find().lean();
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw new Error('Error al obtener los productos.');
    }
  }
 
  async createProduct(productData: Partial<Product>): Promise<Product> {
    // Validación de URLs
    if (productData.imageUrls) {
      productData.imageUrls.forEach(url => {
        if (url && !isValidUrl(url)) {
          throw new Error('Una o más URLs de imagen no son válidas.');
        }
      });
    }

    try {
      const newProduct = await ProductModel.create(productData);
      return newProduct;
    } catch (error) {
      throw new Error('Error al crear el producto.');
    }
  }

  // Actualizar un producto por ID
  async updateProductById(_id: string, productData: Partial<Product>): Promise<Product | null> {
    try {
      const existingProduct = await ProductModel.findById(_id);
      if (!existingProduct) {
        return null;
      }

      // Actualizar los campos del producto si se proporcionan
      if (productData.name) {
        existingProduct.name = productData.name;
      }
      if (productData.description) {
        existingProduct.description = productData.description;
      }
      if (productData.price) {
        existingProduct.price = productData.price;
      }
      if (productData.imageUrls) {
        // Validar URLs en productData.imageUrls
        if (productData.imageUrls.some(url => !isValidUrl(url))) {
          throw new Error('Una o más URLs de imagen no son válidas.');
        }
        existingProduct.imageUrls = productData.imageUrls;
      }
      if (productData.quantity) {
        existingProduct.quantity = productData.quantity;
      }

      const updatedProduct = await existingProduct.save();
      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto por ID.');
    }
  }

  // Eliminar un producto por ID
  async deleteProductById(productId: string): Promise<{ success: boolean; deletedProduct?: Product } | void> {
    try {
      console.log('Deleting product with ID:', productId);
      const deletedProduct = await ProductModel.findByIdAndDelete(productId);
      console.log('Deleted product:', deletedProduct);
      
      if (!deletedProduct) {
        throw new Error('Product not found');
      }

      return { success: true, deletedProduct };
    } catch (error: any) {
      console.error('Error al eliminar el producto:', error.message);
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }

  // Obtener la cantidad total de productos
  async getProductCount(): Promise<number> {
    try {
      const count = await ProductModel.countDocuments().exec();
      return count;
    } catch (error) {
      console.error('Error al obtener la cantidad de productos:', error);
      throw error;
    }
  }

  // Buscar productos por término de búsqueda
  async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const products = await ProductModel.find({ name: { $regex: searchTerm, $options: 'i' } }).lean();
      return products;
    } catch (error) {
      console.error('Error al buscar productos:', error);
      throw new Error('Error al buscar productos.');
    }
  }

}

export default new ProductService();

