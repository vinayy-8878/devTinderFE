import { createSlice } from "@reduxjs/toolkit";

const requests=createSlice({
    name:'requests',
    initialState:null,
    reducers:{
        allRequests:(state,action)=>action.payload,
        removeRequest:(state,action)=>{
const newArray=state.filter((r)=>r._id !== action.payload);
return newArray;
        }
    }
})
export const {allRequests,removeRequest}=requests.actions;
export default requests.reducer; 