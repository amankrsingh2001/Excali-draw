"use client"

import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    rooms: typeof window !== undefined ? JSON.parse(localStorage.getItem('roomList') as string) : [] 
};


export const roomListSlice = createSlice({
    name:"rooms",
    initialState,
    reducers:{
        setRooms(state, action){
            state.rooms = action.payload
        }
    }

})

export const {setRooms} = roomListSlice.actions;
export default roomListSlice.reducer