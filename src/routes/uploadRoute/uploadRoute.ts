// src/routes/uploadRoute/uploadRoute.ts
import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../../settings/cloudinaryconfig'; // Asegúrate de que esta importación sea correcta
import path from 'path';
import { Request, Response, NextFunction } from 'express';

// Configurar almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const router = Router();

router.post('/upload', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Subir a Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    res.json({ url: result.secure_url });
  } catch (error) {
    next(error);
  }
});

export default router;

