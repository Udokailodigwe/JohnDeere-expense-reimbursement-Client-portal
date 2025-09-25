import customFetch from "../../utils/axios";
import toast from "react-hot-toast";

export const registerEmployeeThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    toast.success(`Welcome ${resp.data.user.name}! Registration successful.`);
    return resp.data;
  } catch (error) {
    // validation errors from Joi schema
    if (error.response?.data?.details) {
      error.response.data.details.forEach((detail) => {
        toast.error(detail.message);
      });
    } else {
      // other errors
      toast.error(error.response?.data?.msg || "Registration failed");
    }
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Registration failed"
    );
  }
};

export const registerManagerThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    toast.success(`Welcome ${resp.data.user.name}! Registration successful.`);
    return resp.data;
  } catch (error) {
    if (error.response?.data?.details) {
      error.response.data.details.forEach((detail) => {
        toast.error(detail.message);
      });
    } else {
      toast.error(error.response?.data?.msg || "Registration failed");
    }
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Registration failed"
    );
  }
};

export const activateAccountThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    toast.success(`Account activated successfully.`);
    return resp.data;
  } catch (error) {
    if (error.response?.data?.details) {
      error.response.data.details.forEach((detail) => {
        toast.error(detail.message);
      });
    } else {
      toast.error(error.response?.data?.msg || "Activation failed");
    }
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Activation failed"
    );
  }
};

export const loginThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    toast.success(`Welcome back ${resp.data.user.name}!`);
    return resp.data;
  } catch (error) {
    if (error.response?.data?.details) {
      error.response.data.details.forEach((detail) => {
        toast.error(detail.message);
      });
    } else {
      toast.error(error.response?.data?.msg || "Login failed");
    }
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Login failed"
    );
  }
};
