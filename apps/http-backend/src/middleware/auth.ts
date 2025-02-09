import jwt,{JwtPayload} from "jsonwebtoken"
import { NextFunction, Request, Response } from 'express';
import  {JWT_SECRET}  from "@repo/backend-common/config";



interface AuthRequest extends Request{
    userId:string
}



export const auth = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const token = req.headers.authorization

        if (!token || !token.startsWith('Bearer ')) {
             res.status(401).json({
                success: false,
                message: "Failed to get token"
            });
            return;
        }

        const word = token?.split(' ')

        if(!word || word[1] == undefined){
            res.status(404).json({
                success:false,
                message:"Failed to get token"
            })
            return;
        }
        const authToken = word[1]
        const decodedToken = jwt.verify(authToken, JWT_SECRET) as JwtPayload

        if(!decodedToken    || !decodedToken.id ){
            res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
            return;
        }
        (req as AuthRequest).userId = decodedToken.id

        next()

    } catch (error) {
        res.status(500).json({
          success:false,
          message:"Something went wrong"  
        })
    }
}