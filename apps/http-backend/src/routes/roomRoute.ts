import express, { Router } from "express"
import { createRoom } from "../controller/roomController"
import { auth } from "../middleware/auth"

const roomRouter:Router = Router()



roomRouter.post('/create', auth , createRoom)

export {roomRouter}