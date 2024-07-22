"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../../models/user/UserModel"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        console.log('Datos recibidos en req.body:', req.body);
        console.log('Nombre de usuario enviado:', username);
        const user = yield UserModel_1.default.findOne({ username });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            console.log('Credenciales inválidas');
            res.status(401).json({ error: 'Credenciales inválidas' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error en el controlador de inicio de sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destruir la sesión
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al destruir la sesión:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }
            res.status(200).send('Sesión finalizada');
        });
    }
    catch (error) {
        console.error('Error en el controlador de cierre de sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.default = { login, logout };
