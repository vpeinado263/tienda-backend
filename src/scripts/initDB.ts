import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    console.error('La variable de entorno MONGO_URL no está definida.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log('Conexión a base de datos mongoose DB.');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error);
    process.exit(1);
  }
};

export default connectDB;
