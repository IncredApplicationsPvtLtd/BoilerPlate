import DsobsAPI, { checkForUnauthorizedResponse } from "../../utils/DsobsAPI";

export const getAllJobThunk = async (_, thunkAPI) => {
  let url = "/job";
  try {
    const response = await DsobsAPI.get(url);
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
