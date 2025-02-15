

import axios from "axios";
import { http_backend } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";


async function getRoomId(slug: string) {
    try {
      const response = await axios.get(`${http_backend}/room/slug/class_1`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI5NWMzZGFiLWFhNzktNDI5Zi04Nzc0LTBiM2QwN2Q5OGU3MiIsImlhdCI6MTczOTU2MDQ3MSwiZXhwIjoxNzM5NTc4NDcxfQ.cYk7AG_C6DOcCQuSCYNlDgruLwztXQXp1JfrfXtfmkA`,
        },
      });
      return response.data;
    } catch (error) {
      const err = (error as Error).message;
      console.log(err);
      throw error;
    }
}

interface Params {
    params:{
        roomSlug:string
    }
}



export default async function ChatRoom1({params}:Params){
    const slug = (await params).roomSlug
    const roomId = await getRoomId(slug)
    const id = roomId.data.id

    return <ChatRoom id={id}/>

}