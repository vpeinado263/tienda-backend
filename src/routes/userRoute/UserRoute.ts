import { Router } from "express";
import UserController from "../../controllers/userController/UserController";
import { validateCreateUser, validateUserId } from "../../middlewares/validationMiddleware";

const userRoutes = Router();

userRoutes.post('/users', validateCreateUser, UserController.createUser);
userRoutes.get('/users', UserController.getAllUsers)
userRoutes.get('/users/:id', validateUserId, UserController.getAllUsers)

export default userRoutes;