"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = exports.validateCommonFields = void 0;
const express_validator_1 = require("express-validator");
exports.validateCommonFields = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('El nombre es obligatorio'),
    (0, express_validator_1.check)('description').notEmpty().withMessage('La descripción es obligatoria'),
    (0, express_validator_1.check)('price').isNumeric().withMessage('El precio debe ser un número'),
];
exports.validateId = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('El ID proporcionado no es válido'),
];
