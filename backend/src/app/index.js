import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
import userRouter from "../routes/user.routes.js";
app.use("/api/v1/user", userRouter);

export { app };
