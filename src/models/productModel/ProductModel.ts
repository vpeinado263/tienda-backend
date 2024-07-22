import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;  
  imageUrl: string;
  quantity: number; 
}

const productSchema = new Schema<Product>({
  _id: {type: String, required: true},
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const ProductModel = mongoose.model<Product>('Product', productSchema);

export { ProductModel };







