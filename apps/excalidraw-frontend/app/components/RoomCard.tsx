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
                <div className="w-full h-[65%] bg-orange-800 text-[#C5A495] relative rounded-md " onClick={canvasClickHandler} >
                    <Brush className="lg:w-10 lg:h-10 lg:font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "/>
                </div>
                <div className="flex justify-between flex-col lg:flex-row items-center ">
                    <h3 className="text-md w-full lg:text-xl text-center italic ml-1 2xl:text-start font-bold tracking-wide capitalize ">{room.slug}</h3>
                    
                </div>
                <div className="flex  flex-col 2xl:flex-row  lg:justify-between justify-center items-center mt-2">
                    <div className="flex items-center space-x-2">
                        <UserRound className="w-4 h-4 "/>
                        <p className="text-sm lg:text-md">4 Participants</p>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span className="tracking-tight lg:text-md text-sm whitespace-nowrap">2 mins ago</span>
                  </div>
                </div>
                
        </div>
}