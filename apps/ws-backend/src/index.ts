import { WebSocket, WebSocketServer } from "ws";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db/client";




const wss = new WebSocketServer({port:8080})


interface User {
    ws:WebSocket,
    rooms:number[],
    userId:string
}

const users:User[] = [];

function checkUser(token:string):string | null {

   try {
    const decoded =  jwt.verify(token, JWT_SECRET)
    if(typeof decoded == "string"){
        return null
    }
    if(!decoded || !decoded.id){
        return null;
    }
    return decoded.id;

   } catch (error) {
    const errMessage = (error as Error).message
    console.log(errMessage)
    return null;
   }
}



wss.on('connection', function connection(ws,request){
    const url = request.url
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url.split("?")[1])

    const token = queryParams.get('token') || "";


    const userId = checkUser(token) //userid is id

    if( userId == null){
        ws.close();
        return;
    }
    users.push({
        userId,
        rooms:[],
        ws:ws
    })

    ws.on('message', async function message(data){
        const parsedData = JSON.parse(data as unknown as string)


        if(parsedData.type == "join_room"){
           const user = users.find(x => x.ws == ws)
           user?.rooms.push(parsedData.roomId)
        }
        

        if(parsedData.type == "leave_room"){
            const user = users.find(x => x.ws ==  ws)
            if(!user){
                return;
            }
            user.rooms = user?.rooms.filter(x=>x === parsedData.room)

        }

        if(parsedData.type == "chat"){
            const roomId = parsedData.roomId
            const message = parsedData.message
            
            await prismaClient.chat.create({
                data:{
                    roomId:roomId,
                    userId:userId,
                    message:message
                }
            })

            users.forEach((user)=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomId
                    }))
                }
            })
        }

    })
})