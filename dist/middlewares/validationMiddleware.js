"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = exports.validateCommonFields = void 0;
const express_validator_1 = require("express-validator");
// Validaciones para campos comunes al crear o actualizar un producto
exports.validateCommonFields = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('El nombre es obligatorio'),
    (0, express_validator_1.check)('description').notEmpty().withMessage('La descripción es obligatoria'),
    (0, express_validator_1.check)('price').isNumeric().withMessage('El precio debe ser un número'),
    (0, express_validator_1.check)('imageUrls').isArray().withMessage('Las URLs de las imágenes deben ser un arreglo de cadenas'),
    (0, express_validator_1.check)('imageUrls.*').optional().isURL().withMessage('Cada URL de imagen debe ser una URL válida'),
    (0, express_validator_1.check)('quantity').isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero positivo'),
];
// Validación para el parámetro de ID en las rutas
exports.validateId = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('El ID proporcionado no es válido'),
];
