"use client"

import { Draw } from "@/app/draw/draw"
import { useEffect, useRef } from "react"

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{

        let rect:any = []

            if(canvasRef.current == null ){
                return;
            }
            canvasRef.current.height = window.innerHeight
            canvasRef.current.width = window.innerWidth

            let canvas = canvasRef.current
            Draw(canvas)

    },[canvasRef])

    return<div className="w-full h-full overflow-hidden">
        <canvas ref={canvasRef} className="border-2 border-black"></canvas>
    </div>
       

}