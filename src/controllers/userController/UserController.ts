import { Request, Response } from "express";
import UserService from "../../services/userService/UserService";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        console.error('No se obtienen los usuarios', error.message);
        res.status(500).json({ error: 'Hay problemas en el servidor' });
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const newUser = await UserService.createUser({ username, email, password });

        res.status(201).json({ success: true, data: newUser });
    } catch (error: any) {
        console.error('No se pudo crear el usuario:', error.message);
        res.status(422).json({ error: 'No se pudo crear el usuario' });
    }
};


const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const token = await UserService.authenticateUser(username, password);

        res.status(200).json({ success: true, token });
    } catch (error: any) {
        console.error('Error al iniciar sesión:', error.message);
        res.status(401).json({ error: error.message });
    }
};

export default {
    getAllUsers,
    createUser,
    loginUser
};
