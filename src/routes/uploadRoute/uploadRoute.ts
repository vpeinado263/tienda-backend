import { Router } from 'express';
import uploadController from '../../controllers/uploadController/uploadController';

const router = Router();

router.post('/upload', uploadController.uploadHandler);

export default router;
