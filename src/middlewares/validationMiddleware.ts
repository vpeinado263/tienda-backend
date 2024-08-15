import { check } from 'express-validator';

export const validateCommonFields = [
  check('name').notEmpty().withMessage('El nombre es obligatorio'),
  check('description').notEmpty().withMessage('La descripción es obligatoria'),
  check('price').isNumeric().withMessage('El precio debe ser un número'),
  check('imageUrls').isArray({ min: 1 }).withMessage('Debe proporcionar al menos una URL de imagen'),
  check('imageUrls.*').isURL().withMessage('Cada URL de imagen debe ser válida'),
  check('quantity').isNumeric().withMessage('La cantidad debe ser un número')
];

export const validateId = [
  check('id').isMongoId().withMessage('El ID proporcionado no es válido'),
];

export const validateCreateUser = [
  check('username').notEmpty().withMessage('contraseña obligatoria'),
  check('password').isString().withMessage('Debe ser una cadena').isLength({ min:8 }).withMessage('Debe tener al menos 8 caracteres')
];

export const validateUserId = [
  check('id').isMongoId().withMessage('El ID proporcionado no es válido'),
];
