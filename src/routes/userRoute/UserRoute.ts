import { Router } from "express";
import UserController from "../../controllers/userController/UserController";
import { validateCreateUser } from "../../middlewares/validationMiddleware";
import { authenticateUser } from "../../middlewares/authMiddleware";

const userRoutes = Router();

userRoutes.post('/', validateCreateUser, UserController.createUser);
userRoutes.get('/', authenticateUser, UserController.getAllUsers);
userRoutes.post('/login', UserController.loginUser);

export default userRoutes;
