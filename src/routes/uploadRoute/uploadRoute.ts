// src/routes/uploadRoute/uploadRoute.ts
import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../../config/cloudinaryconfig'; 

const uploadRoute = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

uploadRoute.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

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

    if (file.buffer) {
      uploadStream.end(file.buffer);
    } else {
      res.status(400).send('Invalid file buffer.');
    }
  } catch (error) {
    console.error('Error in upload route:', error);
    res.status(500).send('Error uploading image.');
  }
});

export default uploadRoute;

