"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({messages,id,}: {
  messages: { message: string }[],
  id: string;
}) {
    const {socket, loading} = useSocket()
    const [chats, setChats] = useState(messages)
    const [currentMessage, setCurrentMessage] = useState('')


    useEffect(()=>{

        if(socket && !loading){

            socket.send(JSON.stringify({
                type:"join_room",
                roomId:id
            }))


            socket.onmessage = (event) =>{
                console.log(event)
                const parsedData = JSON.parse(event.data)
                if(parsedData.type === "chat"){
                    setChats(c => [...c, {message:parsedData.message}])
                }
            }
        }
    },[socket, loading, id])


    return <div>
        {
            chats.map((m, index)=>{
                return <div key={index} >{m.message}</div>
            })
        }
        <input type="text" placeholder="Enter your message" value={currentMessage} onChange={(e)=>setCurrentMessage(e.target.value)}/>
        <button onClick={()=>{

            socket?.send(JSON.stringify({
                type:"chat",
                roomId:id,
                message:currentMessage
            }))
            setCurrentMessage('')
        }}>Send Message</button>
    </div>
}
