import { Request, Response } from 'express';
import UserService from '../../services/users/UserService';
import { IUser } from '../../models/user/UserModel';

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.createUser(req.body as IUser);
    res.status(201).json(newUser); 
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const updatedUser = await UserService.updateUserById(userId, req.body as IUser);
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error al actualizar el usuario por ID:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const deleteUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const deletedUser = await UserService.deleteUserById(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(deletedUser);
  } catch (error) {
    console.error('Error al eliminar el usuario por ID:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};


