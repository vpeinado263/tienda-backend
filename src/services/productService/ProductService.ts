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

  async getProductCount(): Promise<number> {
    try {
      const count = await ProductModel.countDocuments().exec();
      return count;
    } catch (error) {
      console.error('Error al obtener la cantidad de productos:', error);
      throw error;
    }
  }

}

export default new ProductService();

