"use client"
import axios from 'axios';

type Shape = {
    type:"rect",
    startX:number,
    startY:number,
    width:number,
    height:number
}   | {
    type:"circle",
        X:number,
        Y:number,
        radius:number,
        startArc:number,
        endArc:number
}

export async function Draw(canvas:HTMLCanvasElement, socket:WebSocket, id:string, token:string){

    if (!canvas || !socket) return;

    let ctx = canvas.getContext('2d')

   
    if(!ctx){
        return; 
    }

    let existingShapes:Shape[] = await getExistingShapes(id, token)
    clearCanvas(existingShapes, canvas, ctx)

    socket.onmessage=(event=>{
            const shapes = JSON.parse(event.data)
            const message = JSON.parse(shapes.message)
            existingShapes.push(message)
            clearCanvas(existingShapes, canvas, ctx)

    }
)

            let mouseMove = false;
            let startX = 0;
            let startY = 0;
            
            canvas.addEventListener('mousedown',(e)=>{
                mouseMove = true;
                startX = e.clientX;
                startY = e.clientY ;
            })

            canvas.addEventListener('mouseup',(e)=>{
                mouseMove = false;
                const width = e.clientX - startX
                const height = e.clientY - startY
                const newShape:Shape = {
                    type:"rect",
                    startX : startX,
                    startY:startY,
                    width:width,
                    height:height
                }
                existingShapes.push(newShape)
                socket.send(JSON.stringify({
                    type:"chat",
                    message:JSON.stringify(newShape),
                    roomId:id
                }))
                
            })
            canvas.addEventListener('mousemove',(e)=>{
                if(mouseMove){
                    const widht = e.clientX - startX
                    const height = e.clientY - startY
                    ctx.strokeStyle = "rgba(0,0,0)" 
                    clearCanvas(existingShapes, canvas, ctx);
                    ctx?.strokeRect(startX, startY, widht, height)
                
                }
            })
}

function clearCanvas (existingShapes:Shape[], canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D){
    ctx?.clearRect(0,0, canvas.width, canvas.height)
    existingShapes.map((shape)=>{
        if(shape.type == "rect"){
            ctx?.strokeRect(shape.startX, shape.startY, shape.width, shape.height)
        }
    })
}

async function getExistingShapes(id:string, token:string){
    const message = await axios.get(`${process.env.NEXT_PUBLIC_HTTP_BACKEND}/room/getChat/${id}`, {headers:{
        Authorization:token
    }})
    const messages = message.data.data
    const shapes = messages.map((x:any)=>{
        const messagedata =JSON.parse(x.message)
        return messagedata
    })
    return shapes
}