import express, { Router } from "express";
import { userRouter } from "./userRouter";
import { roomRouter } from "./roomRoute";
import { auth } from "../middleware/auth";

const mainRouter: Router = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/room", roomRouter);

export { mainRouter };
