import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const uploadHandler = [
  upload.single('file'), 
  (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
    }
    res.status(200).json({ message: 'Archivo subido exitosamente', file: req.file });
  }
];

export default {
  uploadHandler
};

