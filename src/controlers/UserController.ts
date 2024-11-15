import { NextFunction, Request , Response } from "express";
import User from "../database/models/User";
import { UserSchema, userSchema } from "../utils/schema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/verfiyToken";
import { createToken } from "../utils/createToken";

export const createUser = async(req : Request,res:Response,next:NextFunction)=>{
    
    try{
        const validatedData : UserSchema = userSchema.parse(req.body);

        const newUser = await User.create({
           username: validatedData.username,
          email: validatedData.email,
          password: validatedData.password,
          });

        
        //create token
       const token = createToken({ username: newUser.username});
        res.status(201).json({message:"user created successfully",newUser,token});
    }catch(err){
        next(err);
    }

}


export const getAllUsers = async(req : Request,res:Response,next:NextFunction)=>{
    try{
        const users = await User.findAll();
        res.status(200).json(users);
       }
       catch(err){
       return next(err);
       }
}


export const getUser = async(req : Request,res:Response, next: NextFunction)=>{

    const userId = req.params.userId;
    console.log('userid : ',userId)
    const user = await User.findByPk(userId);
    try{
        if(!user) throw new Error("no user found");

        console.log(`user is : ${user}`);
        res.status(200).json(user);
    }
    catch(err){
        return next(err);
       }


}


export const updateUser= async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.params.userId;
    const user = await User.findByPk(userId); 

    if(!user){
        throw new Error("No user found");
    }

    try{

    const validatedData : UserSchema = userSchema.parse(req.body);

    // Update username if provided
    if (validatedData.username) {
        user.username = validatedData.username;
    }

    // Update email if provided
    if (validatedData.email) {
        user.email = validatedData.email;
    }

    // Update password if provided
    if (validatedData.password) {
        user.password = validatedData.password; // The password will be hashed in the @BeforeUpdate hook
    }

    // Save the updated user
    await user.save();
    res.status(203).json({message:"user updated successfully" ,user})
    }
    catch(err){
        return next(err);
    }

}

export const deleteUser = async(req:Request,res:Response,next:NextFunction)=>{

    const userId = req.params.userId;

    //check if the user exist 
    const user = await User.findByPk(userId); 
    if(!user){
        throw new Error("there is no user found");
    }
    
    try{
        await User.destroy({
            where:{
                id:userId
            }
        });

        res.status(202).json({message:"user deleted successfully",user})

    }catch(err){
        next(err)
    }


}