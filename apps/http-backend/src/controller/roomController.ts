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
            id:createRoom.id      
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