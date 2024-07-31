import express from 'express';
import multer from 'multer';
import cloudinary from '../../config/cloudinaryconfig'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Configuración de multer para la subida de archivos
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    // Crear un nuevo stream para Cloudinary
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

        // Enviar la URL de la imagen como respuesta
        res.json({ url: result.secure_url });
      }
    );

    if (file.stream) {
      file.stream.pipe(uploadStream);
    } else {
      res.status(400).send('Invalid file stream.');
    }

  } catch (error) {
    console.error('Error in upload route:', error);
    res.status(500).send('Error uploading image.');
  }
});

export default router;

