"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SessionController_1 = __importDefault(require("../../controllers/sessionController/SessionController"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const sessionRoutes = express_1.default.Router();
// Ruta para iniciar sesión
sessionRoutes.post('/login', SessionController_1.default.login);
// Ruta para cerrar sesión
// Middleware de autenticación activado para cerrar sesión solo para usuarios autenticados
sessionRoutes.post('/logout', authMiddleware_1.authenticateUser, SessionController_1.default.logout);
exports.default = sessionRoutes;
