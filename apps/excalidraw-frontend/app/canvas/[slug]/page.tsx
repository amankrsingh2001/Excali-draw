
import Roomid from "@/app/components/Roomid"


export default async function CanvasPage({params}:{
   params:{
        slug:string      
    }
}){
    const slug = (await params).slug
   

    return <Roomid slug={slug}/>
       
}