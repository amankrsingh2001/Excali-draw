"use client";

import { useEffect, useRef } from "react";
import { Draw } from "../draw/draw";
import { Circle, Square } from "lucide-react";
import { useSocket } from "@/hook/useSocket";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

interface Rooms {
  id: string;
}

export default function Canvas({ id }: Rooms) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { socket, loading } = useSocket();
  const {token} = useSelector((state:RootState)=>state.auth)
  const pathname = usePathname(); 

    
  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );
    }
  }, [socket]);

  useEffect(() => {
    if (socket == undefined || canvasRef.current == null) {
      return;
    }
    canvasRef.current.height = window.innerHeight;
    canvasRef.current.width = window.innerWidth;

    let canvas = canvasRef.current;
    // calling canvas
    Draw(canvas, socket, id, token as string);
  }, [canvasRef, socket, id, loading]);

  if (!socket || socket == undefined) {
    return <div>Loading...</div>;
  }

  const inviteRoomHandler = async()=>{
   try {
    const copyText = await navigator.clipboard.writeText(`http://localhost:3002${pathname}`)
    console.log("text copied")
   } catch (error) {  
      const err = (error as Error).message
      console.log(err)
   }
  }

  return (
    <div className="w-full h-full overflow-hidden relative">
      <canvas ref={canvasRef} className="border-2 border-black"></canvas>
      <div className="absolute h-[6vh] left-[32%] border-[1px] top-4 w-[32vw] bg-white shadow-2xl rounded-lg">
        <button className="hover:bg-sky-100">
          <Square height={24} width={24} color="#393a3b" />
        </button>
        <button className="hover:bg-blue-200-100">
          <Circle height={24} width={24} color="#393a3b" />
        </button>
      </div>
      <button onClick={inviteRoomHandler} className="bg-gradient-to-r from-black to-orange-500 absolute h-[6vh] right-[10%] border-[1px] top-4 w-fit px-4 py-2 text-white shadow-2xl rounded-lg">Invite User</button>
    </div>
  );
}
