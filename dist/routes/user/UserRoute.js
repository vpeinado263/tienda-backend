"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../../controllers/userController/UserController"));
const express_validator_1 = require("express-validator");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/', [
    (0, express_validator_1.check)('username').optional().isString(),
    (0, express_validator_1.check)('email').optional().isEmail(),
    (0, express_validator_1.check)('password').optional().isLength({ min: 6 }),
], UserController_1.default.createUser);
userRoutes.get('/', UserController_1.default.getAllUsers);
userRoutes.get('/:userId', [
    (0, express_validator_1.check)('userId').isMongoId().withMessage('El ID proporcionado no es válido'),
], UserController_1.default.getUserById);
userRoutes.put('/:userId', [
    (0, express_validator_1.check)('userId').isMongoId().withMessage('El ID proporcionado no es válido'),
    (0, express_validator_1.check)('name').optional().notEmpty().withMessage('El nombre es obligatorio'),
    (0, express_validator_1.check)('email').optional().isEmail().withMessage('El correo electrónico no es válido'),
], UserController_1.default.updateUserById);
userRoutes.delete('/:userId', [
    (0, express_validator_1.check)('userId').isMongoId().withMessage('El ID proporcionado no es válido'),
], UserController_1.default.deleteUserById);
exports.default = userRoutes;
