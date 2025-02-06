import { roomNameValidation } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { Request, Response } from "express";

interface AuthRequest extends Request{
    userId:string
}


export const createRoom = async(req:Request, res:Response)=>{
    const name:string = req.body.name
    const userId = (req as AuthRequest).userId

    const validName = roomNameValidation.safeParse(name)

    if(!validName){
        res.status(403).json({
            success:false,
            message:"Invalid room name"
        })
        return;
    }

    try {
        const createRoom = await prismaClient.room.create({
            data:{
                slug:name,
                adminId:userId
            },
            select:{
                slug:true
            }
        })
        if(!createRoom){
             res.status(402).json({
                success:false,
                message:"Failed to create user"
            })
            return;
        }
        res.status(200).json({
            success:true,
            message:"Room created succesfully"
        })
        return;
        
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        return;
    }
}