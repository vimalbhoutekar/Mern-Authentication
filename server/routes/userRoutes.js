import express from "express";
import { getUserData } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/data",getUserData);


export default userRouter;