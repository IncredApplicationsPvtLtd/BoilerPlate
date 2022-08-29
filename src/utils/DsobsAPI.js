import axios from "axios";
import { getTokenFromLocalStorgae } from "./localStorage";
import { logoutAdmin } from "./../features/admin/adminSlice";
const API_BASE_URL = "http://localhost:8001";

const DsobsAPI = axios.create({
  baseURL: API_BASE_URL,
});

DsobsAPI.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorgae();
  //console.log("myToken", token);
  if (token) {
    config.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  console.log("errorFormat-->", error);
  if (error.response.status === 401) {
    thunkAPI.dispatch(logoutAdmin());
    return thunkAPI.rejectWithValue("Unauthorized Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
export default DsobsAPI;
