import { hideLoading, httpGetAllJob, showLoading } from "../allJob/allJobSlice";
import DsobsAPI, { checkForUnauthorizedResponse } from "./../../utils/DsobsAPI";

export const addJobThunk = async (job, thunkAPI) => {
  try {
    const response = await DsobsAPI.post("/job", job);
    //console.log('addJob API',response);
    return response.data.msg;
  } catch (error) {
    // console.log('addJob Err',error)
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    const response = await DsobsAPI.delete(`/job/${jobId}`);
    thunkAPI.dispatch(hideLoading());
    thunkAPI.dispatch(httpGetAllJob());
    return response.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk=async({jobId,updatedData},thunkAPI)=>{
  try{
    const response=await DsobsAPI.patch(`/job/${jobId}`,updatedData);
    return response.data.msg;

  }catch(error){
    return checkForUnauthorizedResponse(error,thunkAPI)
  }
}
