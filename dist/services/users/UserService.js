"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../../models/user/UserModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
                const newUser = new UserModel_1.default({
                    username: userData.username,
                    email: userData.email,
                    password: hashedPassword,
                });
                return yield newUser.save();
            }
            catch (error) {
                console.error('Error al crear el usuario:', error);
                throw new Error('Error al crear el usuario');
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserModel_1.default.find();
            }
            catch (error) {
                console.error('Error al obtener todos los usuarios:', error);
                throw new Error('Error al obtener todos los usuarios');
            }
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserModel_1.default.findById(userId);
            }
            catch (error) {
                console.error('Error al obtener el usuario por ID:', error);
                throw new Error('Error al obtener el usuario por ID');
            }
        });
    }
    static updateUserById(userId, updatedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserModel_1.default.findByIdAndUpdate(userId, updatedUser, { new: true });
            }
            catch (error) {
                console.error('Error al actualizar el usuario por ID:', error);
                throw new Error('Error al actualizar el usuario por ID');
            }
        });
    }
    static deleteUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserModel_1.default.findByIdAndDelete(userId);
            }
            catch (error) {
                console.error('Error al eliminar el usuario por ID:', error);
                throw new Error('Error al eliminar el usuario por ID');
            }
        });
    }
}
exports.default = UserService;
