import {Request,Response ,NextFunction } from "express";
import { ZodError } from "zod";


export const errorHandler = (error:Error , req:Request , res:Response , next:NextFunction)=>{

    // Handle Zod validation errors
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      message: err.message,
      path: err.path,
    }));
     res.status(400).json({
      errors: formattedErrors,
      errorCode: 400,
    });
  }

  if (error.name === "SequelizeConnectionRefusedError") {
     res.status(503).json({
      errors: [{ message: "Database connection refused.", errorCode: 503 }],
    });
  }

    res.status(500).send({errors:[{message:error.message || "An unexpected error occurred." ,errorCode:500}]})

}