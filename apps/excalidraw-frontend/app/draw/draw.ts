
import Canvas from '../canvas/[roomid]/page';
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

export function Draw(canvas:HTMLCanvasElement){
    let ctx = canvas.getContext('2d')

    let existingShapes:Shape[] = []

    if(!ctx){
        return; 
    }
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
                existingShapes.push({
                    type:"rect",
                    startX : startX,
                    startY:startY,
                    width:width,
                    height:height
                })
                
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