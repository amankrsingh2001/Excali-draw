export function Draw(canvas:HTMLCanvasElement){
    let ctx = canvas.getContext('2d')

            let mouseMove = false;
            let startX = 0;
            let startY = 0;

            canvas.addEventListener('mousedown',(e)=>{
                mouseMove = true;
                     startX = e.clientX;
                     startY = e.clientY;
            })
            canvas.addEventListener('mouseup',(e)=>{
                mouseMove = false;

            })
            canvas.addEventListener('mousemove',(e)=>{
                if(mouseMove){
                    const widht = e.clientX - startX
                    const height = e.clientY - startY
                    ctx?.clearRect(0,0, canvas.width, canvas.height)
                    ctx?.strokeRect(startX, startY, widht, height)
                
    
                   
                }
            })
}