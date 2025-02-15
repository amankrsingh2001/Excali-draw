import { Dispatch, SetStateAction } from "react";

interface ModalDetails{
    setCreateRoom:Dispatch<SetStateAction<boolean>>; 
    createRoom:boolean
}

export default function CreateCanvas({setCreateRoom, createRoom}:ModalDetails){
   





    return <div className="border-[1px] shadow-lg flex flex-col justify-around  w-[40%] h-[30%] rounded-lg px-4" onClick={(e)=>e.stopPropagation()}>
        <h1 className="font-extrabold text-2xl mt-4">Create New Canvas</h1>
        <div className="flex flex-col">
        <label
            htmlFor="name"
            className="font-semibold font-sans mb-2"
          >
            Canvas Name
          </label>
          <input
          name="name"
            type="text"
            placeholder="Enter Canvas Slug..."
            id="name"
            className="border-2 px-4 py-2 rounded-md outline-none shadow-inner border-gray-300 font-md"
          />
        </div>
        <div className="flex justify-between">
            <button onClick={()=>{
                    setCreateRoom(!createRoom)
            }} className="bg-gradient-to-r w-[48%] bg-clip-text font-bold from-black to-orange-500 px-5 py-2 rounded-md hover:opacity-90 font-sans mt-3 border-[1px] border-slate-500">
                Cancel
            </button>
            <button className="bg-gradient-to-r w-[48%] from-black to-orange-500 px-5 py-2 font-semibold text-white rounded-md hover:opacity-90 font-sans mt-3">
                Create Canvas
            </button>
        </div>
    </div>
}