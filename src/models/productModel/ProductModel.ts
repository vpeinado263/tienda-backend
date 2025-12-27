

export interface Product extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;  
  imageUrls: string[];
  quantity: number; 
}







