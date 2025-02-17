import { roomNameValidation } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

interface AuthRequest extends Request{
    userId:string
}


export const createRoom = async(req:Request, res:Response)=>{
    const data  = req.body

    const userId = (req as AuthRequest).userId

    const parsedData = roomNameValidation.safeParse(data)

    if(!parsedData.success ){
        res.status(403).json({
            success:false,
            message:"Invalid room name",
            error:parsedData.error
        })
        return;
    }


    try {
        
      const createRoom = await prismaClient.room.create({
        data:{
            slug:parsedData.data.name,
            adminId:userId
        }
      })


        if(!createRoom || !createRoom.id){
             res.status(411).json({
                success:false,
                message:"Failed to create room"
            })
            return;
        }

        res.status(200).json({
            success:true,
            message:"Room created succesfully",
            room:createRoom     
        })
        return;
        
    } catch (error) {
        const errMessage = (error as Error).message 
         res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:errMessage
        })
        return;
    }
}

export const getRoom = async(req:Request, res:Response)=>{
    console.log()
    try {
        const roomId = Number(req.params.roomId)

        const messages = await prismaClient.chat.findMany({
            where:{
                roomId:roomId,
            },
            orderBy:{
                id:"desc"
            },
            take:50
        })

        res.status(200).json({
            success:true,
            data:messages
        })
        return;
    } catch (error) {

        const err = (error as Error).message
        res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:err
        })
    }
}

export const getRoomSlug = async(req:Request, res:Response)=>{
    try {
        const slug = req.params.sulg;

        const room = await prismaClient.room.findFirst({
            where:{
                slug:slug
            }
        })
         res.status(200).json({
            success:true,
            data:room
        })
        return
    } catch (error) {

        const err = (error as Error).message
            res.status(500).json({
                success:false,
                message:"Something went wrong",
                error:err
            })  
            return;
    }
}

export const getRoomList = async(req:Request, res:Response)=>{
    try {
        const userId = (req as AuthRequest).userId

        const roomList = await prismaClient.room.findMany({
            where:{
                adminId:userId
            },
            orderBy:{
                id:"desc"
            },
            select:{
                id:true,
                slug:true,
                createdAt:true,
                adminId:false
            }
        })
        res.status(200).json({
            success:true,
            rooms:roomList
        })
        return;

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}