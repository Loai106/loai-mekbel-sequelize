import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/User";
import bcrypt from "bcrypt";
import { salt } from "../database/models/User";
import { SECRET_KEY } from "../utils/verfiyToken";

export const login = async(req: Request,res:Response , next: NextFunction)=>{

    const {email,password} = req.body;

    const user  = await User.findOne({
        where:{
            email
        }
    })

    if(!user){
        res.status(404).send('no user with this email, sign up');
    }
    else{
            const payload = {
                id : user.id,
                username: user.username
            }
            //check if the password is correct
            if(await bcrypt.compare(password, user.password) ){
                  const token = jwt.sign(payload,SECRET_KEY);

                  res.status(200).json({token })
            }
            else{
                res.status(404).json({
                    message:"your password is wrong"
                })
            }
    }
 



}