import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

const initialState = {
  isLoading: false,
  title:'',
  description:'',
  company: '',
  designation:'',
  openings:'',
  annualSalary:'',
  city:'',
  natureOfHireOptions: [
    { name: "Permanent", val: 1 },
    { name: "Contract", val: 2 },
    { name: "Part Time", val: 3 },
    { name: "Consulting", val: 4 },
    { name: "Internship", val: 5 },
  ],
  natureOfHire:1,
  genderOptions:[{ name: "Male", val: 1 },
  { name: "Female", val: 2 },
  { name: "Any", val: 3 }],
  gender:2,
  isEditing:false,
  editJobId:''
};

export const httpAddJob=createAsyncThunk('job/addJob',addJobThunk);
export const httpDeleteJob=createAsyncThunk('job/deleteJob',deleteJobThunk);
export const httpEditJob=createAsyncThunk('/job/editJob',editJobThunk);

const jobSlice = createSlice({
    name:'job',
    initialState,
    reducers:{
        handleChange:(state,{payload})=>{
            console.log('main',payload);
            const {name,value}=payload;
            state[name]=value;
        },
        clearValue:(state)=>{
            return {...initialState}
        },
        setEditJob:(state,{payload})=>{
            state.title=payload.title;
            state.description=payload.description;
            state.company=payload.company;
            state.annualSalary=payload.annualSalary;
            state.city=payload.city;
            state.gender=payload.gender;
            state.natureOfHire=payload.natureOfHire;
            state.designation=payload.designation;
            state.openings=payload.openings;
            state.isEditing=true;
            state.editJobId=payload._id;
        }

    },
    extraReducers:{
        [httpAddJob.pending]:(state)=>{
            state.isLoading=true;

        },
        [httpAddJob.fulfilled]:(state,{payload})=>{
            //state.isLoading=false;
            toast.success(payload);
            return {...initialState};
            
        },
        [httpAddJob.rejected]:(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload);
        },
        [httpDeleteJob.fulfilled]:(state,{payload})=>{
            toast.success(payload);
        },
        [httpDeleteJob.rejected]:(state,{payload})=>{
            toast.error(payload);
        },
        [httpEditJob.pending]:(state)=>{
            state.isLoading=true;
        },
        [httpEditJob.fulfilled]:(state,{payload})=>{
            state.isLoading=false;
            toast.success(payload);
        },
        [httpEditJob.rejected]:(state,{payload})=>{
            state.isLoading=false;
            toast.error(payload);
        }
        

    }
})

export const {handleChange,clearValue,setEditJob} = jobSlice.actions;
export default jobSlice.reducer;
