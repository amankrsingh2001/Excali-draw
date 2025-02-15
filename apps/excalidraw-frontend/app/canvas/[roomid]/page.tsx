"use client"

import { Draw } from "@/app/draw/draw"
import { useEffect, useRef, useState } from "react"
import { Square } from 'lucide-react';
import { Circle } from 'lucide-react';

export default function Canvas(){
    const [shape, setShape] = useState<string>('rect')
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{

            if(canvasRef.current == null ){
                return;
            }
            canvasRef.current.height = window.innerHeight 
            canvasRef.current.width = window.innerWidth

            let canvas = canvasRef.current
            // calling canvas 
            Draw(canvas)

    },[canvasRef])

    return<div className="w-full h-full overflow-hidden relative">
        <canvas ref={canvasRef} className="border-2 border-black"></canvas>
        <div className="absolute h-[6vh] left-[32%] border-[1px] top-4 w-[32vw] bg-white shadow-2xl rounded-lg">
            <button className="hover:bg-sky-100">
            <Square height={24} width={24} color="#393a3b" />
            </button>
            <button className="hover:bg-blue-200-100">
            <Circle height={24} width={24} color="#393a3b" />
            </button>
           
        </div>
    </div>
       

}