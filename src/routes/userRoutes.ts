import express, { NextFunction } from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controlers/UserController";

const router = express.Router();


router.post('/api/users',createUser)
router.get('/api/users',getAllUsers)
router.get('/api/users/:userId',getUser);
router.put('/api/users/:userId',updateUser);
router.delete('/api/users/:userId',deleteUser);

export {router as UserRouter}