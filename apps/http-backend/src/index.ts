import "./dotenv";
import cors from "cors"
import express from "express"
import { mainRouter } from "./routes/mainRouter";




const app = express()

app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use('/api/v1', mainRouter)



app.listen(3001,()=>{
    console.log("http-server is running on port 3001")
})