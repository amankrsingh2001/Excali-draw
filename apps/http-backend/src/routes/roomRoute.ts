import express, { Router } from "express"
import { createRoom, getRoom, getRoomList, getRoomSlug } from "../controller/roomController"
import { auth } from "../middleware/auth"

const roomRouter:Router = Router()




roomRouter.get('/slug/:slug', auth, getRoomSlug)

roomRouter.get('/getRoomList', auth, getRoomList)

roomRouter.get('/getChat/:roomId', auth, getRoom)

roomRouter.post('/create', auth , createRoom)

export {roomRouter}