import express, { Router } from "express";
import { signin, signup, validUser } from "../controller/userController";
import { auth } from "../middleware/auth";

const userRouter:Router = Router();
userRouter.get('/checkUser', auth, validUser)

userRouter.post('/signup', signup) 
userRouter.post('/signin', signin);

export { userRouter };