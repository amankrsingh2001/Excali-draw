"use client"


import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomSlug, setRoomSlug] = useState<string>("")
  const router = useRouter()

  const onclickHandler = ()=>{
    router.push(`/room/${roomSlug}`)
  }

  return (
    <div >
      <input value={roomSlug} onChange={(e)=>setRoomSlug(e.target.value)} type="text" placeholder="room slug"/>
      <button onClick={onclickHandler}>Join Room</button>
    </div>
  );
}
