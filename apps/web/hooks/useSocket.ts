

import { useEffect, useState } from "react";
import { ws_backend } from "../app/config";


export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>()
    useEffect(()=>{
        const ws = new WebSocket(`${ws_backend}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVjYjE5YWVjLTRiZDQtNDJmNi05M2Y5LTIwM2RiODA1MDVhZSIsImlhdCI6MTczOTI5OTkwMywiZXhwIjoxNzM5MzE3OTAzfQ.JgWKImJT8ng6LxjlwhehrYVjfydydSkc8jvfz0NUI6c`)
        ws.onopen = () =>{
            setLoading(false)
            setSocket(ws)
        }
    },[])
    return {socket, loading}
}