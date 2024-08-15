import { IUser, UserModel } from "../../models/userModel/UserModel";

class UserService {
     async getAllUsers():  Promise<IUser[]> {
        return await UserModel.find();
    }
    
    async createUser(userData: Partial<IUser>): Promise<IUser> {
        const newUser = new UserModel(userData);
        return await newUser.save();
    }
}

export default new UserService();