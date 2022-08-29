import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addAdminToLocalStorage,
  addTokenToLocalStorage,
  getAdminFromLocalStorage,
  removeAdminFromLocalStorage,
} from "../../utils/localStorage";
import { getOTPThunk, verifyOTPThunk, updateProfileThunk } from "./adminThunk";

const initialState = {
  isLoading: false,
  otpId: null,
  admin: getAdminFromLocalStorage(),
};

export const httpGetOTP = createAsyncThunk("auth/getOTP", getOTPThunk);
export const httpVerifyOTP = createAsyncThunk("auth/verifyOTP", verifyOTPThunk);
export const httpUpdateProfile = createAsyncThunk(
  "admin/profile",
  updateProfileThunk
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logoutAdmin: (state, { payload }) => {
      state.otpId = null;
      state.admin = null;
      removeAdminFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    [httpGetOTP.pending]: (state) => {
      state.isLoading = true;
    },
    [httpGetOTP.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.otpId = payload.otpId;
      toast(payload.msg);
    },
    [httpGetOTP.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast(payload);
    },
    [httpVerifyOTP.pending]: (state) => {
      state.isLoading = true;
    },
    [httpVerifyOTP.fulfilled]: (state, { payload }) => {
      const { msg, user, token } = payload;
      state.isLoading = false;
      state.admin = user;
      addAdminToLocalStorage(user);
      addTokenToLocalStorage(token);
      toast.success(msg);
    },
    [httpVerifyOTP.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
