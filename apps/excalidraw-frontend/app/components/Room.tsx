"use client";

import { useDispatch, useSelector } from "react-redux";
import RoomCard from "./RoomCard";
import { RootState } from "../store/store";
import { Brush, Plus } from "lucide-react";
import { Suspense, useState } from "react";
import CreateCanvas from "./createCanvas";
import Link from "next/link";
import { setToken } from "../slice/userSlice";
import {useRouter} from "next/navigation"
import { setRooms } from "../slice/roomSlice";
import toast, { Toaster } from "react-hot-toast";


interface RoomDetails {
  slug: string;
  createdAt: string;
  id: number;
}

export default function Room() {
  const [createRoom, setCreateRoom] = useState<boolean>(false);
  const dispatch = useDispatch()
  const router = useRouter()

  const { rooms } = useSelector((state: RootState) => state.roomList);

    const logOutHandler = ()=>{

      localStorage.removeItem('token')
      localStorage.removeItem('roomList')
      dispatch(setToken(null))
      dispatch(setRooms([]))
      toast.success("logout")
      router.push('/signin')
    }
 
  

  return (
    <div className="h-screen w-screen">
      <Toaster/>
      <div className="h-[9vh] w-full flex justify-between border-b-2 sticky top-0 z-50 opacity-90 bg-white 2xl:px-24 px-12">
        <div className="flex  gap-2 justify-center my-auto ">
        <Link href="/" className="flex space-x-2">
          <svg width="30" height="30" viewBox="0 0 24 24" className="my-auto">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="black" />
                <stop offset="100%" stopColor="orange" />
              </linearGradient>
            </defs>
            <Brush stroke="url(#gradient)" />
          </svg>

          <h1 className="2xl:text-2xl text-lg font-bold bg-gradient-to-r from-[#28282B] to-orange-500 text-transparent bg-clip-text">
            DrawTogether
          </h1>
        </Link>
        </div>
        <div className=" flex gap-4 items-center">
          <div onClick={() => setCreateRoom(true)} className="flex items-center h-[60%] justify-between my-auto bg-gradient-to-r  from-black to-orange-500 rounded-md px-2 py-2 lg:px-4 lg:py-2 cursor-pointer">
            <Plus  className="lg:w-4 lg:h-4 w-3 h-3 text-white mr-2 " />
            <button className="text-white  lg:text-md text-sm font-bold  h-[60%] ">
              Create Canvas
            </button>
          </div>

        
            <button onClick={logOutHandler} className="border-[1px] px-4 py-2 lg:text-md bg-gradient-to-r from-black to-orange-500 h-[60%]  text-transparent bg-clip-text text-md rounded-md hover:opacity-90 font-serif">
              Logout
            </button>

        </div>
        
      </div>
        <div className=" flex flex-col w-[90%] mt-8 mx-auto gap-5">
        <h2 className="text-2xl font-bold text-gray-900">Active Canvases </h2>

        {rooms !== null && rooms.length === 0 && 
           <div className="text-2xl">
            You dont have any active canvas
           </div>
    
        }
      
    <div className="flex gap-8 flex-col flex-wrap md:flex-row justify-center items-center lg:item-start lg:justify-start  ">
      {rooms &&
        rooms.map((room: RoomDetails) => {
          return (
            <div
              key={room.id}
              className="border-[1px] border-slate-300 w-[60%] md:w-[40%] lg:w-[22%] shadow-lg h-[40vh] rounded-md px-4 py-4"
            >
              <RoomCard room={room} />
            </div>
          );
        })}
    </div>
    <div>
    {
            createRoom && <div onClick={()=>setCreateRoom(false)} className="fixed inset-0 border-2 border-black !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm  ">
            <CreateCanvas createRoom ={createRoom} setCreateRoom={setCreateRoom}/>
             </div>
        }
    </div>
      
    </div>
      

    </div>
  );
}
