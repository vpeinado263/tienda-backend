"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const welcomeMiddlewares_1 = require("../../middlewares/welcomeMiddlewares");
const ProductRoute_1 = __importDefault(require("../productRoute/ProductRoute"));
const UserRoute_1 = __importDefault(require("../user/UserRoute"));
const SessionRoute_1 = __importDefault(require("../sessionRoute/SessionRoute"));
const appRoute = (0, express_1.Router)();
// Middleware para analizar el cuerpo de la solicitud como JSON
appRoute.use(express_2.default.json());
// Ruta principal
appRoute.get('/', welcomeMiddlewares_1.welcomeMiddleware);
// Rutas para productos, usuarios y sesión
appRoute.use('/products', ProductRoute_1.default);
appRoute.use('/users', UserRoute_1.default);
appRoute.use('/session', SessionRoute_1.default);
exports.default = appRoute;
