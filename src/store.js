import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./features/admin/adminSlice";
import allJobSlice from "./features/allJob/allJobSlice";
import jobSlice from "./features/job/jobSlice";


const store = configureStore({
  reducer: {
    admin: adminSlice,
    job: jobSlice,
    allJob:allJobSlice
  },
});

export default store;
