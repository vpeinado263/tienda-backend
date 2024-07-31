import express from 'express';
import cors from 'cors';
import cloudinary from './config/cloudinaryconfig';
import upload from './config/multerConfig';
import { sessionConfig } from './config/SessionConfig';
import connectDB from './scripts/initDB';
import productRoute from './routes/productRoute/ProductRoute';
import uploadRoute from './routes/uploadRoute/uploadRoute';

const app = express();

app.use(sessionConfig);

connectDB();

app.use(cors({
  origin: ['http://localhost:3000', 'https://tienda-x--swart.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      const bufferStream = require('stream').Readable.from(file.buffer);
      bufferStream.pipe(uploadStream);
    });
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image.');
  }
});

app.use('/api/products', productRoute);
app.use('/api', uploadRoute);

export default app;
