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
  check('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
  check('email').notEmpty().withMessage('El correo electrónico es obligatorio').isEmail().withMessage('Debe proporcionar un correo válido'),
  check('password').isString().withMessage('La contraseña debe ser una cadena').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

