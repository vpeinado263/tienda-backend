"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey';
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ error: 'Acceso no autorizado. Token no válido.' });
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Acceso no autorizado. Token no válido.' });
    }
};
exports.authenticateUser = authenticateUser;
