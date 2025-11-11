import express from 'express';
import cors from 'cors';
import userRouter from './routers/user.router.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/users", userRouter);

export {app};