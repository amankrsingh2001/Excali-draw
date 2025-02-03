import "./dotenv";

import express from "express"
import { JWT_SECRET } from '@repo/backend-common/config';


const app = express()

app.use(express.json())

app.use('/api/v1')

JWT_SECRET

app.listen(3001,()=>{
    console.log("http-server is running on port 3000")
})