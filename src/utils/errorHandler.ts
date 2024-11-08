import {Request,Response ,NextFunction } from "express";


export const errorHandler = (error:Error , req:Request , res:Response , next:NextFunction)=>{


    res.status(500).send({errors:[{message:error.message ,errorCode:500}]})

}