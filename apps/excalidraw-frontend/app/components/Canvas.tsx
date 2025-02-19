"use client";

import { useEffect, useRef, useState } from "react";
import { Draw } from "../draw/draw";
import { Circle, Square, Triangle } from "lucide-react";
import { useSocket } from "@/hook/useSocket";
import { RootState } from "../store/store";
import { Minus } from 'lucide-react';
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

interface Rooms {
  id: string;
}

export default function Canvas({ id }: Rooms) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { socket, loading } = useSocket();
  const {token} = useSelector((state:RootState)=>state.auth)
  const pathname = usePathname(); 
  const [shape, setShape] = useState<"arc"|"rect"|"line"|"triangle">("rect")
  const [selected,  setSelected] = useState(false)

  useEffect(()=>{
    console.log(shape)
    // @ts-ignore
    window.selectedShape = shape

  },[shape]) 

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
    const id = toast.loading('loading')
   try {
    const copyText = await navigator.clipboard.writeText(`http://localhost:3002${pathname}`)
    toast.success("Link Copied", {
      id:id
    })
    console.log("text copied")
   } catch (error) {  
      const err = (error as Error).message
      console.log(err)
      toast.error('Something went wrong',{
        id:id
      })
   }
  }

  return (
    <div className="w-full h-full overflow-hidden relative">
      <canvas ref={canvasRef} className=""></canvas>
      <div className="absolute h-[6vh] left-[32%] border-[1px] top-4 w-[32vw] bg-white  shadow-2xl rounded-lg flex gap-1 items-center">

          <Square  onClick={()=>
          setShape("rect")
        }className={`ml-4 ${shape=="rect"?"text-red-500 rounded-md":""} `}  height={24} width={20} color="#000" />


          <Circle onClick={()=>
          setShape('arc')
        } height={24} width={20} color="#666666" />

        <Minus className="rotate-45" onClick={()=>
          setShape('line')
          
        }/>
      </div>
      <button onClick={inviteRoomHandler} className="bg-gradient-to-r from-black to-orange-500 absolute h-[6vh] right-[10%] border-[1px] top-4 w-fit px-4 py-2 text-white shadow-2xl rounded-lg">Invite User</button>
    </div>
  );
}
