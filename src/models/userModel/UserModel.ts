import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    id: number;
    username: string;
    password: string;
    isActive: boolean;
    createdAt: Date; 
}

const UserSchema: Schema = new Schema({
    id: { type: Number, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
    isActive: { type: Boolean, default: true},
    createdAt: { type: Date, default: Date.now}
});

export const UserModel = mongoose.model<IUser>('user', UserSchema);