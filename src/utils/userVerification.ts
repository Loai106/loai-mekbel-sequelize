import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "./verfiyToken";
import { Response,NextFunction } from "express";



export const verifyUser = async (req : CustomRequest , res: Response ,next : NextFunction)=>{
    try{
        
        //getting the auther id 
        const {autherId} = req.body;

        //if user Id in the url 
        const userId = req.params.userId;  

        //extract the token from the req
        const token = req.token as JwtPayload;
    

        //make sure the token is valid
        if(!token || typeof token ==='string'){
            throw new Error("invalid token");
        }

        //make sure the logged user is the authorized to update the user
        console.log(`${typeof userId } userId:${userId}// ${typeof token.id} tokenId: ${token.id} autherId: ${autherId}`)
        if(userId && parseInt(userId) !== token.id){
            throw new Error('User not the authorized user');
        }
        //make sure the logged user the same as the author 
        if( autherId && autherId != token.id){
            throw new Error('Auther not the authorized user');

    }

    next();

    }
    catch(err){
        next(err);
    }
}