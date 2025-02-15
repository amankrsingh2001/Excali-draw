import { combineReducers } from "@reduxjs/toolkit";
import  authReducer  from "../slice/userSlice";
import roomListSlice from "../slice/roomSlice"


export const rootReducer = combineReducers({
    auth:authReducer,
    roomList:roomListSlice
})