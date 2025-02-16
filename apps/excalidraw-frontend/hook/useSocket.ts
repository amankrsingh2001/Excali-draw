import { RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";



export function useSocket(){
    const [loading, setLoading] = useState(true);
    const {token} = useSelector((state:RootState)=>state.auth)
    const [socket, setSocket] = useState<WebSocket>()
    const sendToken = token?.split(" ")[1]
    useEffect(()=>{
        const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_BACKEND}?token=${sendToken}`)
        ws.onopen = () =>{
            setLoading(false)
            setSocket(ws)
        }
    },[])

    return {socket, loading}
}