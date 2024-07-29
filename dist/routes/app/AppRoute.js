"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductRoute_1 = __importDefault(require("../productRoute/ProductRoute"));
const UserRoute_1 = __importDefault(require("../user/UserRoute"));
const appRoute = (0, express_1.Router)();
appRoute.use('/api/products', ProductRoute_1.default);
appRoute.use('/api/users', UserRoute_1.default);
exports.default = appRoute;
