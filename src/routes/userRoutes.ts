import express, { NextFunction } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controlers/UserController";
import { verifyToken } from "../utils/verfiyToken";
import { verifyUser } from "../utils/userVerification";

const router = express.Router();


router.post('/api/users',verifyToken,createUser)
router.get('/api/users',verifyToken,getAllUsers)
router.get('/api/users/:userId',verifyToken,verifyUser,getUser);
router.put('/api/users/:userId',verifyToken,verifyUser,updateUser);
router.delete('/api/users/:userId',verifyToken,verifyUser,deleteUser);

export {router as UserRouter}