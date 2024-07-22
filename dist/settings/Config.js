"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
try {
    dotenv_1.default.config();
}
catch (error) {
    console.error("Error al cargar las variables de entorno:", error);
    process.exit(1);
}
exports.MONGO_URL = process.env.MONGO_URL;
