import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    isActive: boolean;
    createdAt: Date; 
}

const userSchema: Schema = new Schema<IUser>({
    username: { type: String, required: true},
    password: { type: String, required: true},
    isActive: { type: Boolean, default: true},
    createdAt: { type: Date, default: Date.now}
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export { UserModel };