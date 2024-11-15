
import express from "express"
import { login } from "../controlers/loginController";

const router = express.Router();


router.post('/api/login',login);

export {router as loginRouter}