import express, { Router } from "express"
import { createRoom, getRoom } from "../controller/roomController"
import { auth } from "../middleware/auth"

const roomRouter:Router = Router()



roomRouter.post('/create', auth , createRoom)
roomRouter.get('/getroom/:roomId', auth, getRoom)

export {roomRouter}