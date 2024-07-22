import User, { IUser } from '../../models/user/UserModel';
import bcrypt from 'bcrypt';

class UserService {
  static async createUser(userData: IUser): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword, 
      });
      return await newUser.save();
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw new Error('Error al crear el usuario');
    }
  }

  static async getAllUsers(): Promise<IUser[]> {
    try {
      return await User.find();
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      throw new Error('Error al obtener todos los usuarios');
    }
  }

  static async getUserById(userId: string): Promise<IUser | null> {
    try {
      return await User.findById(userId);
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
      throw new Error('Error al obtener el usuario por ID');
    }
  }

  static async updateUserById(userId: string, updatedUser: IUser): Promise<IUser | null> {
    try {
      return await User.findByIdAndUpdate(userId, updatedUser, { new: true });
    } catch (error) {
      console.error('Error al actualizar el usuario por ID:', error);
      throw new Error('Error al actualizar el usuario por ID');
    }
  }

  static async deleteUserById(userId: string): Promise<IUser | null> {
    try {
      return await User.findByIdAndDelete(userId);
    } catch (error) {
      console.error('Error al eliminar el usuario por ID:', error);
      throw new Error('Error al eliminar el usuario por ID');
    }
  }
}

export default UserService;




