import axios from "axios"
import { http_backend } from "../app/config"
import { ChatRoomClient } from "./ChatRoomClient"


async function getChats(id:string){
    try {
        const chats = await axios.get(`http://localhost:3001/api/v1/room/getChat/6`,{
            headers:{
                Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI5NWMzZGFiLWFhNzktNDI5Zi04Nzc0LTBiM2QwN2Q5OGU3MiIsImlhdCI6MTczOTU2MDQ3MSwiZXhwIjoxNzM5NTc4NDcxfQ.cYk7AG_C6DOcCQuSCYNlDgruLwztXQXp1JfrfXtfmkA`
            }
        })
        return chats.data
    } catch (error) {
        const err = (error as Error).message
            console.log(err)
    }

}
interface Room{
    id:string
}

export async function ChatRoom ({id}:Room){
   
    const messages = await getChats(id)

    return <ChatRoomClient messages={messages.data} id={id}/>

}