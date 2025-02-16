"use client"

import { Brush, Clock, UserRound } from "lucide-react"
import { UsersRound } from 'lucide-react';
import { useRouter } from "next/navigation";

interface RoomDetails {
    slug: string,
    createdAt: string,
    id: number
  }
  interface RoomCardProps {
    room: RoomDetails
  }
  

export default function RoomCard({room}:RoomCardProps){
    const router = useRouter()
    const canvasClickHandler = ()=>{
            router.push(`/canvas/${room.slug}`)
    }
   
        return <div className=" h-full w-full cursor-pointer  flex flex-col gap-4 rounded-md">
                <div className="w-full h-[65%] bg-orange-800 text-[#C5A495] relative rounded-md">
                    <Brush className="w-10 h-10 font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "/>
                </div>
                <div className="flex justify-between  items-center">
                    <h3 className="text-xl font-bold tracking-wide capitalize ">{room.slug}</h3>
                    <button onClick={canvasClickHandler} className="rounded-md bg-gradient-to-r from-black to-orange-500 text-white font-semibold px-3 py-2">Join Canvas</button>
                </div>
                <div className="flex justify-between mt-2">
                    <div className="flex items-center space-x-2">
                        <UserRound className="w-4 h-4"/>
                        <p className="">4 Participants</p>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Clock className="w-2 h-2 lg:w-4 lg:h-4" />
                    <span className="tracking-tight">2 mins ago</span>
                  </div>
                </div>
                
        </div>
}