"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("../src/middlewares/errorHandler"));
const SessionConfig_1 = require("./settings/SessionConfig");
const initDB_1 = __importDefault(require("./scripts/initDB"));
const ProductRoute_1 = __importDefault(require("./routes/productRoute/ProductRoute"));
const UserRoute_1 = __importDefault(require("./routes/user/UserRoute"));
const SessionRoute_1 = __importDefault(require("./routes/sessionRoute/SessionRoute"));
const AppRoute_1 = __importDefault(require("./routes/app/AppRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(SessionConfig_1.sessionConfig);
(0, initDB_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));
app.use(AppRoute_1.default);
app.use('/api/products', ProductRoute_1.default);
app.use('/api/users', UserRoute_1.default);
app.use('/api/session', SessionRoute_1.default);
app.use(errorHandler_1.default);
exports.default = app;
