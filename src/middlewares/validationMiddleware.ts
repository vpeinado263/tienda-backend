import { check } from 'express-validator';

export const validateCommonFields = [
  check('name').notEmpty().withMessage('El nombre es obligatorio'),
  check('description').notEmpty().withMessage('La descripción es obligatoria'),
  check('price').isNumeric().withMessage('El precio debe ser un número'),
];

export const validateId = [
  check('id').isMongoId().withMessage('El ID proporcionado no es válido'),
];
