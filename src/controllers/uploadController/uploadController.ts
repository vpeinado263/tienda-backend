import { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../../config/cloudinaryconfig';

// Configuración de Multer para usar almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controlador para manejar la subida de archivos
const uploadHandler = [
  upload.single('file'), // 'file' es el nombre del campo en el formulario que contiene el archivo
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se subió ningún archivo' });
      }

      // Subir archivo a Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { resource_type: 'auto' }, // Auto-detectar el tipo de recurso
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        ).end(req.file?.buffer); // Usar el operador de encadenamiento opcional
      });

      res.status(200).json({
        message: 'Archivo subido exitosamente',
        file: result
      });
    } catch (error) {
      console.error('Error al subir el archivo a Cloudinary:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
];

export default {
  uploadHandler
};
