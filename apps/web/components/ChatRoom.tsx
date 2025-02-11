import axios from "axios"
import { http_backend } from "../app/config"
import { ChatRoomClient } from "./ChatRoomClient"


async function getChats(id:string){
    try {
        const chats = await axios.get(`http://localhost:3001/api/v1/room/getChat/6`,{
            headers:{
                Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVjYjE5YWVjLTRiZDQtNDJmNi05M2Y5LTIwM2RiODA1MDVhZSIsImlhdCI6MTczOTI4NDM5MCwiZXhwIjoxNzM5MzAyMzkwfQ.9kxa4GKNRzNPns25gF_H9fxWHKeeRM1O7DL9Ftit-Gg`
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