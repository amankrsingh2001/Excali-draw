"use client"
import axios from 'axios';

type Shape = {
    type:"rect",
    startX:number,
    startY:number,
    width:number,
    height:number
}   | {
    type:"arc",
        startX:number,
        startY:number,
        radius:number,
        startArc:number,
        endArc:number
} | {
    type:"line",
    startX:number,
    startY:number,
    endX:number,
    endY:number
    
} | null

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
                let newShape:Shape|null = null
                const width = e.clientX - startX
                const height = e.clientY - startY
                // @ts-ignore
                const shape = window.selectedShape
                if(shape == "rect"){
                     newShape = {
                        type:"rect",
                        startX : startX,
                        startY:startY,
                        width:width,
                        height:height
                    }
                   
                }
                else if(shape == "arc"){
                    let centerX = startX+width/2
                    let centerY = startY+height/2
                    let radius = Math.abs(width/2)
                    newShape={
                        type:"arc",
                        startX:centerX,
                        startY:centerY,
                        radius,
                        startArc:0,
                        endArc:Math.PI*2
                    }
                  
                }
                else if(shape == "line"){
                    newShape = {
                        type:"line",
                        startX:startX,
                        startY:startY,
                        endX:e.clientX,
                        endY:e.clientY
                    }   
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
                    // @ts-ignore
                    const shape = window.selectedShape
                    const width = e.clientX - startX
                    const height = e.clientY - startY
                    if(shape == "rect"){
                        ctx.strokeStyle = "rgba(0,0,0)" 
                        clearCanvas(existingShapes, canvas, ctx);
                        ctx?.strokeRect(startX, startY, width, height)
                    }else if (shape == "arc"){
                        let centerX = startX+width/2
                        let centerY = startY+height/2
                        let radius = Math.abs(width/2)
                        clearCanvas(existingShapes, canvas, ctx);
                        ctx.beginPath()
                        ctx?.arc(centerX, centerY, radius, 0, Math.PI*2)
                        ctx.stroke()
                    }else if (shape == "line"){
                        clearCanvas(existingShapes, canvas, ctx)
                        ctx?.beginPath()
                        ctx.moveTo(startX, startY)
                        ctx?.lineTo(e.clientX, e.clientY)
                        ctx.stroke()
                    }
                }
            })
}

function clearCanvas (existingShapes:Shape[], canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D){
    ctx?.clearRect(0,0, canvas.width, canvas.height)
    existingShapes.map((shape)=>{
        if(shape == null) return;
        if(shape.type == "rect"){
            ctx?.strokeRect(shape.startX, shape.startY, shape.width, shape.height)
        }else if(shape.type == "arc"){
            ctx.beginPath()
            ctx?.arc(shape.startX, shape.startY, shape.radius, shape.startArc, shape.endArc)
            ctx.stroke()
        }else if (shape.type == "line"){
            ctx?.beginPath()
            ctx.moveTo(shape.startX, shape.startY)
            ctx?.lineTo(shape.endX, shape.endY)
            ctx.stroke()
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