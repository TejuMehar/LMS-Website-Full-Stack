import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
   name:"user",
   initialState: {
    userData:null,
    authChecked: false,
   },
   reducers: {
    setUserData: (state,action)=>{
    state.userData = action.payload
    },
    setAuthChecked: (state,action)=>{
    state.authChecked = action.payload
    }
   }
})

export const {setUserData, setAuthChecked} = userSlice.actions
export default userSlice.reducer