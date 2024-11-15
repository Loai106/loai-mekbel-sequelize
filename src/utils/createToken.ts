import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./verfiyToken";

export function createToken(payload: any) : string{
    const token = jwt.sign(payload,SECRET_KEY);
    return token;
}