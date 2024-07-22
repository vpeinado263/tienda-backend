import express from 'express';
import sessionController from '../../controllers/sessionController/SessionController';
import { authenticateUser } from '../../middlewares/authMiddleware';

const sessionRoutes = express.Router();

// Ruta para iniciar sesión
sessionRoutes.post('/login', sessionController.login);

// Ruta para cerrar sesión
// Middleware de autenticación activado para cerrar sesión solo para usuarios autenticados
sessionRoutes.post('/logout', authenticateUser, sessionController.logout);

export default sessionRoutes;

