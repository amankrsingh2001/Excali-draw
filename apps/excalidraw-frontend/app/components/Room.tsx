"use client";

import { useSelector } from "react-redux";
import RoomCard from "./RoomCard";
import { RootState } from "../store/store";
import { Brush, Link, Plus } from "lucide-react";
import { useState } from "react";
import CreateCanvas from "./createCanvas";

interface RoomDetails {
  slug: string;
  createdAt: string;
  id: number;
}

export default function Room() {
  const [createRoom, setCreateRoom] = useState<boolean>(true);

  const { rooms } = useSelector((state: RootState) => state.roomList);

  return (
    <div>
      <div className="h-[9vh] w-full flex justify-between border-b-2 sticky top-0 z-50 opacity-90 bg-white px-24">
        <div className="flex  gap-2 justify-center my-auto ">
          <svg width="30" height="30" viewBox="0 0 24 24" className="my-auto">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="black" />
                <stop offset="100%" stopColor="orange" />
              </linearGradient>
            </defs>
            <Brush stroke="url(#gradient)" />
          </svg>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#28282B] to-orange-500  text-transparent bg-clip-text">
            DrawTogether
          </h1>
        </div>

        <div className="flex items-center h-[60%] justify-between my-auto bg-gradient-to-r  from-black to-orange-500 rounded-md px-4 py-2 ">
          <Plus className="w-4 h-4 text-white mr-2 " />
          <button onClick={() => setCreateRoom(true)} className="text-white   font-bold">
            Create Canvas
          </button>
        </div>
      </div>

      {rooms &&
        rooms.map((room: RoomDetails) => {
          return (
            <div
              key={room.id}
              className="border-[1px] border-slate-300 w-[20vw] shadow-lg h-[40vh] rounded-md px-4 py-4"
            >
              <RoomCard room={room} />
            </div>
          );
        })}

        {
            createRoom && <div onClick={()=>setCreateRoom(false)} className="fixed inset-0 border-2 border-black !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm" >
            <CreateCanvas createRoom ={createRoom} setCreateRoom={setCreateRoom}/>
        </div>
        }
    </div>
  );
}
