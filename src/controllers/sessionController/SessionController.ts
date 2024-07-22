import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/user/UserModel';

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    console.log('Datos recibidos en req.body:', req.body); 
    console.log('Nombre de usuario enviado:', username);

    const user = await UserModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Credenciales inválidas');
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }
    
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en el controlador de inicio de sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destruir la sesión
    req.session.destroy((err: Error | null) => {
      if (err) {
        console.error('Error al destruir la sesión:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      res.status(200).send('Sesión finalizada');
    });
  } catch (error) {
    console.error('Error en el controlador de cierre de sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default { login, logout };


