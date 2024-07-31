import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { Request, Response } from 'express';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error });
  }
});


export default router;
