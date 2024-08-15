import { Request, Response } from "express";
import UserService from "../../services/userService/UserService";

 const getAllUsers =  async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        console.error('No se obtinen los usuarios', error.message);
        res.status(500).json({ error: 'Hay problemas en le servidor'});
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body
        const newUser = await UserService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error: any) {
        console.error('No se pudo crear un usuario:', error.message);
        res.status(422).json({ error: 'No se pudo crear el usuario'});
    }
};

export default {
    getAllUsers,
    createUser
};