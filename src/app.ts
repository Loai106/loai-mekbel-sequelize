import express ,{ Express,NextFunction,Request,Response } from "express";
import "./database/connections"
import bodyParser from "body-parser";
import { errorHandler } from "./utils/errorHandler";
import { UserRouter } from "./routes/userRoutes";
import { PostRouter } from "./routes/postRoutes";
import { loginRouter } from "./routes/loginRoutes";
const app : Express = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



/////post

app.use(UserRouter)
app.use(PostRouter)
app.use(loginRouter);

app.use(errorHandler);


export default app;