 import { Request, Response, NextFunction } from 'express';
 import jwt, { JwtPayload } from 'jsonwebtoken';
 import { config } from 'dotenv';
 config();
 const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey';
 export const authenticateUser = (req: RequestWithUserId, res: Response, next: NextFunction) => {
   const token = req.header('Authorization');
   if (!token) {
     return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
   }
   try {
     const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
     if (!decoded || !decoded.userId) {
       return res.status(401).json({ error: 'Acceso no autorizado. Token no válido.' });
     }
     req.userId = decoded.userId;
     next();
   } catch (error) {
     res.status(401).json({ error: 'Acceso no autorizado. Token no válido.' });
   }
 };
 interface RequestWithUserId extends Request {
   userId?: string;
 }