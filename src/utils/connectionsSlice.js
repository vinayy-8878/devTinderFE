import { createSlice } from "@reduxjs/toolkit";

const connections=createSlice({
    name:'connection',
    initialState:null,
    reducers:{
        addConnections:(state,action)=>action.payload,
        removeConnections:(state,action)=>null
    }
})
export const {addConnections,removeConnections}=connections.actions;
export default connections.reducer;