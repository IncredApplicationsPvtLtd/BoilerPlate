import DsobsAPI, { checkForUnauthorizedResponse } from "../../utils/DsobsAPI"

export const getOTPThunk=async ({mobile},thunkAPI)=>{
   
    try{
        const response=await DsobsAPI.post('/getOTP',{mobile});
        console.log('getOTP API res-->',response);
        return response.data;

    }catch(error){
        console.log('getOTP API Err',error);
        return thunkAPI.rejectWithValue(error.response.data.msg)

    }
}

export const verifyOTPThunk=async ({otpId,otpCode},thunkAPI)=>{
    try{
        const response=await DsobsAPI.post('/verifyOTP',{otpId,otpCode});
        console.log('verifyOTP API',response);
        return response.data;

    }catch(error){
        console.log('verifyOTP API Err-->',error);
        return thunkAPI.rejectWithValue(error.response.data.msg);

    }
}

export const updateProfileThunk=async({userId,profileData},thunkAPI)=>{
    try{
        const response=await DsobsAPI.patch(`/user/${userId}`,profileData);
        return response.data;

    }catch(error){
        return checkForUnauthorizedResponse(error,thunkAPI);
    }
}