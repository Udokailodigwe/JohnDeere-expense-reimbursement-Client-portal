import customFetch from "../../utils/axios";

export const registerEmployeeThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    // toast.success(`Welcome ${resp.data.user.name}! Registration successful.`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Registration failed"
    );
  }
};

export const registerManagerThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Registration failed"
    );
  }
};

export const activateAccountThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Activation failed"
    );
  }
};

export const loginThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Login failed"
    );
  }
};
