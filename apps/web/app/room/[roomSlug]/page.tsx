

import axios from "axios";
import { http_backend } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";


async function getRoomId(slug: string) {
    try {
      const response = await axios.get(`${http_backend}/room/slug/class_1`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVjYjE5YWVjLTRiZDQtNDJmNi05M2Y5LTIwM2RiODA1MDVhZSIsImlhdCI6MTczOTI4NDM5MCwiZXhwIjoxNzM5MzAyMzkwfQ.9kxa4GKNRzNPns25gF_H9fxWHKeeRM1O7DL9Ftit-Gg`,
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