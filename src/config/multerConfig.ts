import multer from 'multer';

// Configuración de multer para usar almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
