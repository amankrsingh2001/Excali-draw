import { Request, Response } from "express";
import { loginValidation, registerValidation } from "@repo/common/types";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from '@repo/db/client';


export const signup = async (req: Request, res: Response) => {

  const data = req.body;
  const validData = registerValidation.safeParse(data);

  if (!validData.success) {
    res.status(400).json({
      success: false,
      message: "Invalid data",
    });
    return;
  }

  try {

  const user =   await prismaClient.user.findFirst({
        where:{
            email:data.email
        }
    })

    if(user){
         res.status(409).json({
            success:false,
            message:"Email already exist"
        })
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(data.password, salt);
    

    const createUser = await prismaClient.user.create({
        data:{
            email:data.email,
            password:hashPassword,
            firstName:data.firstName,
            lastName:data.lastName,
            image:data.image
        }
    })

    if(!createUser){
        return 
    }

    res.status(200).json({
        success:true,
        message:'User created Successfully'
    })
    return;
  } catch (error) {
    const errMessage = (error as Error).message // type assertion
    res.status(500).json({
        success:false,
        message:`"Something went wrong" ${errMessage}`
    })
  }
};


export const signin = async(req:Request, res:Response)=>{
    const data  = req.body;
    const validData = loginValidation.safeParse(data)
    if(!validData.success){
        res.status(400).json({
            success: false,
            message: "InValid data",
          });
          return;
    }

    try {
        const {email, password} = data

        const user = await prismaClient.user.findFirst({
            where:{
                email:email
            },
            select:{
                id:true,
                email:true,
                password:true,
                firstName:true,
                lastName:true,
                image:true
            }
        })
      

        if(!user){  
            res.status(404).json({
                success:false,
                message:"Email isn't registered"
            })
            return
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword){
            res.status(401).json({
                success:false,
                message:"Password isn't valid"
            })
        }

        const token = jwt.sign({id:user.id},JWT_SECRET,{
            expiresIn:"5h"
        })

         res.status(200).json({
            data:{
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image
            },
            token:token
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