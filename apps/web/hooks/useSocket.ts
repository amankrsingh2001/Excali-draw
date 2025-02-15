

import { useEffect, useState } from "react";
import { ws_backend } from "../app/config";


export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>()
    useEffect(()=>{
        const ws = new WebSocket(`${ws_backend}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI5NWMzZGFiLWFhNzktNDI5Zi04Nzc0LTBiM2QwN2Q5OGU3MiIsImlhdCI6MTczOTU2MDQ3MSwiZXhwIjoxNzM5NTc4NDcxfQ.cYk7AG_C6DOcCQuSCYNlDgruLwztXQXp1JfrfXtfmkA`)
        ws.onopen = () =>{
            setLoading(false)
            setSocket(ws)
        }
    },[])
    return {socket, loading}
}