// src/routes/uploadRoute/uploadRoute.ts

import express from 'express';
import upload from '../../config/multerConfig'; // Importa la configuración de multer
import cloudinary from '../../config/cloudinaryconfig'; 

const router = express.Router();

// Ruta para cargar archivos
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    // Crear un stream de carga en Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error, result) => {
        if (error) {
          console.error('Error uploading image to Cloudinary:', error);
          return res.status(500).send('Error uploading image.');
        }

        if (!result) {
          console.error('Cloudinary result is undefined');
          return res.status(500).send('Error uploading image.');
        }
        res.json({ url: result.secure_url });
      }
    );

    // Convertir el buffer en un stream de lectura y cargar a Cloudinary
    if (file.buffer) {
      const bufferStream = require('stream').Readable.from(file.buffer);
      bufferStream.pipe(uploadStream);
    } else {
      res.status(400).send('Invalid file buffer.');
    }
  } catch (error) {
    console.error('Error in upload route:', error);
    res.status(500).send('Error uploading image.');
  }
});

export default router;
