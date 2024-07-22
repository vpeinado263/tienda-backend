import { Router } from 'express';
import userController from '../../controllers/userController/UserController';
import { check } from 'express-validator';

const userRoutes = Router();

userRoutes.post('/', [
 
  check('username').optional().isString(),
  check('email').optional().isEmail(),
  check('password').optional().isLength({ min: 6 }),
], userController.createUser);

userRoutes.get('/', userController.getAllUsers);

userRoutes.get('/:userId', [

  check('userId').isMongoId().withMessage('El ID proporcionado no es válido'),
], userController.getUserById);

userRoutes.put('/:userId', [
 
  check('userId').isMongoId().withMessage('El ID proporcionado no es válido'),
  check('name').optional().notEmpty().withMessage('El nombre es obligatorio'),
  check('email').optional().isEmail().withMessage('El correo electrónico no es válido'),
], userController.updateUserById);

userRoutes.delete('/:userId', [

  check('userId').isMongoId().withMessage('El ID proporcionado no es válido'),
], userController.deleteUserById);


export default userRoutes;






