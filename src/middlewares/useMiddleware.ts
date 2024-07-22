import bcrypt from 'bcrypt';
import { IUser } from '../models/user/UserModel';

const hashPasswordMiddleware = async function(this: IUser, next: Function) {
  try {
    if (!this.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
};

export default hashPasswordMiddleware;
