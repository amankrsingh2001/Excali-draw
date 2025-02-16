"use client"

import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import Canvas from "./Canvas"

interface RoomDetails{
    slug:string
}

export default function Roomid({slug}:RoomDetails){
    const {rooms} = useSelector((state:RootState)=>state.roomList)
    
        console.log("🚀 ~ Roomid ~ rooms:", rooms)
        console.log("🚀 ~ Roomid ~ slug:", slug)

        const activeRoom = rooms.filter((room:any)=>{
            return room.slug === slug            
        })

        console.log(activeRoom)
        const {id} = activeRoom[0]

    return  <Canvas id={id}></Canvas>
}
