import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllJobThunk } from './allJobThunk';
const initialState={
    isLoading:false,
    jobs:[]
}

export const httpGetAllJob=createAsyncThunk('job/allJob',getAllJobThunk);

const allJobSlice=createSlice({
    name:'allJob',
    initialState,
    reducers:{
        showLoading:(state)=>{
            state.isLoading=true;
        },
        hideLoading:(state)=>{
            state.isLoading=false;
        }

    },
    extraReducers:{
        [httpGetAllJob.pending]:(state)=>{
            state.isLoading=true;
        },
        [httpGetAllJob.fulfilled]:(state,{payload})=>{
            state.isLoading=false;
            state.jobs=payload.jobs;
        },
        [httpGetAllJob.rejected]:(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload);
        }
    }
})


export const {showLoading,hideLoading}=allJobSlice.actions;
export default allJobSlice.reducer;