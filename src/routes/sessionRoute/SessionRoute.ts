import express from 'express';
import sessionController from '../../controllers/sessionController/SessionController';
import { authenticateUser } from '../../middlewares/authMiddleware';

const sessionRoutes = express.Router();

sessionRoutes.post('/login', sessionController.login);

sessionRoutes.post('/logout', authenticateUser, sessionController.logout);

export default sessionRoutes;

