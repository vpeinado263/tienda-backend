import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configuración de multer para manejo de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ruta para subir archivos
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          // Si el error es desconocido, manejamos el error de forma segura
          if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
          }
          return res.status(500).json({ message: 'An unknown error occurred' });
        }
        res.status(200).json({ url: result?.secure_url });
      }
    );

    req.file.stream.pipe(uploadStream);
  } catch (error) {
    // Manejo seguro del error
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});

export default router;
