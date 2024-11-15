import { Request , Response ,NextFunction } from "express";
import  jwt,{ JwtPayload } from "jsonwebtoken";


export const SECRET_KEY = 'test';

export interface CustomRequest extends Request {
    token ?: string | JwtPayload;
}


export const verifyToken = async(req : Request , res: Response ,next: NextFunction)=>{
        try{
            const authHeader = req.header('Authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("Authorization header missing");
            throw new Error('Please provide a valid Authorization header');
        }

        const token = authHeader.replace('Bearer ', '');
        console.log(`Token received: ${token}`);
        
        if (!token) {
            console.log("Token is empty after stripping 'Bearer '");
            throw new Error('Token is empty after stripping "Bearer "');
        }

        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
        (req as CustomRequest).token = decoded;
        
        console.log("Token decoded successfully:", decoded);
        next();
        

        }catch(err){
            res.status(401).send('Please authenticate');
        }
}