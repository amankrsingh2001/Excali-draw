import express, { Router } from "express";
import { signin, signup } from "../controller/userController";

const userRouter:Router = Router();
userRouter.post('/signup', signup) 
userRouter.post('/signin', signin);

export { userRouter };