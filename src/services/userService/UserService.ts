import { IUser, UserModel } from "../../models/userModel/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
    async getAllUsers(): Promise<IUser[]> {
        return await UserModel.find();
    }
    
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password!, saltRounds);
        
        const newUser = new UserModel({ ...userData, password: hashedPassword });
        return await newUser.save();
    }
    
    async authenticateUser(username: string, password: string): Promise<string | null> {
        const user = await UserModel.findOne({ username });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        console.log("Contraseña almacenada:", user.password);
        console.log("Contraseña proporcionada:", password);
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Contraseña incorrecta");
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, { expiresIn: "1h" });
        return token;
    }
}

export default new UserService();
