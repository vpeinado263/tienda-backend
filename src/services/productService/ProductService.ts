import {  Product } from '../../models/productModel/ProductModel';
import { isValidUrl } from '../../utils/validators';


class ProductService {
  
  async createProduct(productData: Partial<Product>): Promise<Product> {
    if (productData.imageUrls) {
      productData.imageUrls.forEach(url => {
        if (url && !isValidUrl(url)) {
          throw new Error('Una o más URLs de imagen no son válidas.');
        }
      });
    }
  }

  async deleteProductById(productId: string): Promise<{ success: boolean; deletedProduct?: Product } | void> {
    try {
      console.log('Deleting product with ID:', productId);
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

  async getProductCount(): Promise<number> {
    try {
      return count;
    } catch (error) {
      console.error('Error al obtener la cantidad de productos:', error);
      throw error;
    }
  }

}

export default new ProductService();

