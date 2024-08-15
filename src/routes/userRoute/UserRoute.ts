import { Router } from "express";
import UserController from "../../controllers/userController/UserController";
import { validateCreateUser } from "../../middlewares/validationMiddleware";

const userRoutes = Router();

userRoutes.post('/', validateCreateUser, UserController.createUser);
userRoutes.get('/', UserController.getAllUsers)


export default userRoutes;