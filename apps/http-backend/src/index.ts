import express from "express"

const app = express()

app.use(express.json())


app.listen(3001,()=>{
    console.log("http-server is running on port 3000")
})