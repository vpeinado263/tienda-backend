"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const initDB_1 = __importDefault(require("./scripts/initDB"));
const AppRoute_1 = __importDefault(require("./routes/app/AppRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, initDB_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://tienda-x--swart.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use('/api', AppRoute_1.default);
exports.default = app;
