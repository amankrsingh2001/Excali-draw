"use client";

import { useEffect, useRef } from "react";
import { Draw } from "../draw/draw";
import { Circle, Square } from "lucide-react";
import { useSocket } from "@/hook/useSocket";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

interface Rooms {
  id: string;
}

export default function Canvas({ id }: Rooms) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { socket, loading } = useSocket();
  const {token} = useSelector((state:RootState)=>state.auth)
    
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
    </div>
  );
}
