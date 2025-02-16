
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    signupData: null,
    loading: false,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null
};



export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state, action){
            state.token = action.payload
        },

        setLoading(state, action){
            state.loading = action.payload
        },
        
        setSignUpData(state,action){
            state.signupData = action.payload
        }
    }
})

export const {setToken, setLoading, setSignUpData} = authSlice.actions;
export default authSlice.reducer