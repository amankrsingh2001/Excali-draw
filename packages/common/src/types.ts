import { z } from "zod"

export const registerValidation = z.object({
    email:z.string().email({message:"Email isn't valid"}),
    password:z.string().min(5,{message:"Password length can be less than 5 words"}).max(16,{message:"Password length can be more than 16 words"}),
    firstName:z.string(),
    lastName:z.string(),
    image:z.string().optional()
})

export const loginValidation = z.object({
    email:z.string().email({message:"Email isn't valid"}),
    password:z.string().min(5,{message:"Password length can be less than 5 words"}).max(16,{message:"Password length can be more than 16 words"}),
})

export const roomNameValidation = z.object({
    name:z.string().min(3,{message:"Room name cannot be less than 3 digits"}).max(16,{message:"Room name cannot be more than 16 digits"})
})