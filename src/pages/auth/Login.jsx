import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { toast } from "react-toastify";
import { httpGetOTP, httpVerifyOTP } from "../../features/admin/adminSlice";
import { useNavigate } from "react-router-dom";

import { FormInput } from "./../../components";
import './login.css';
const Login = () => {
  const [authData,setAuthData]=useState({phone:null,otp:null});
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {isLoading,otpId,admin}=useSelector((store)=>{
    return store.admin;
  })

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    console.log('handleChange--->',name,value)
    setAuthData({...authData,[name]:value})
  }
  
  const getOTPHandler=(e)=>{
    e.preventDefault();
    if(!authData.phone){
      toast.error('Please Enter Phone No.')
      return;
    }
    //console.log(authData.phone);
    dispatch(httpGetOTP({mobile:authData.phone}))

  }

  const verifyOTPHandler=async(e)=>{
    e.preventDefault();
    if(!authData.otp){
      toast.error('Please Enter OTP Code');
      return;
    }
    try{
      await dispatch(httpVerifyOTP({otpId:otpId,otpCode:authData.otp}))
      navigate('/');

    }catch(error){
      console.log('oop',error);

    }
    
  }
  
  // useEffect(()=>{
  //   if(admin){
  //     navigate('/')
  //   }
  // },[admin,navigate])

  return (
    <div className="login">
      <h2 className="login_title">DSOBS Admin And Staff Access</h2>
      <form className="login_form">
        <div className="login_row">
          <label htmlFor='phone' className="login_label">Phone Number</label>
          <div className="login_input">
            <input type="text" name="phone" id="phone"
            className="login_input" onChange={handleChange}/>
            <button type="button" className="btn" disabled={isLoading} onClick={getOTPHandler} >{isLoading?'Wait..':'Get OTP'}</button>
          </div>
        </div>

       {otpId && ( <div className="login_row">
          <label htmlFor='otp' className="login_label">OTP</label>
          <div className="login_input">
            <input type="text" name="otp" id="otp" className="login_input" onChange={handleChange}/>
            <button type="button" className="btn" disabled={isLoading} onClick={verifyOTPHandler}>{isLoading?'Verifying..':'Verify OTP'}</button>
          </div>
        </div>)}
       
      </form>
    </div>
  );
};

export default Login;
