import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  registerEmployeeThunk,
  registerManagerThunk,
  activateAccountThunk,
  loginThunk,
} from "./userThunk";
import {
  addUserToLocalStorage,
  addUserToSessionStorage,
  removeUserFromLocalStorage,
  removeUserFromSessionStorage,
  getUserFromSessionStorage,
  getUserFromLocalStorage,
} from "../../utils/localStorage";

const initialState = () => {
  const persistentUser = getUserFromLocalStorage();
  const tempUser = getUserFromSessionStorage();

  return {
    user: persistentUser
      ? JSON.parse(persistentUser)
      : tempUser
      ? JSON.parse(tempUser)
      : null,
    isLoading: false,
    error: null,
  };
};

export const registerEmployee = createAsyncThunk(
  "user/registerEmployee",
  async (user, thunkAPI) => {
    return await registerEmployeeThunk("/auth/register", user, thunkAPI);
  }
);

export const registerManager = createAsyncThunk(
  "user/registerManager",
  async (user, thunkAPI) => {
    return registerManagerThunk("/auth/register/manager", user, thunkAPI);
  }
);

export const activateAccount = createAsyncThunk(
  "user/activateAccount",
  async (user, thunkAPI) => {
    return activateAccountThunk("/auth/activate-account", user, thunkAPI);
  }
);

export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  return loginThunk("/auth/login", user, thunkAPI);
});

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      removeUserFromLocalStorage();
    },
    clearTempUser: (state) => {
      state.user = null;
      state.error = null;
      removeUserFromSessionStorage();
    },
  },

  extraReducers: (builder) => {
    //registerEmployee
    builder
      .addCase(registerEmployee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerEmployee.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        addUserToSessionStorage(state.user);
        state.error = null;
        toast.success(`Welcome ${state.user.name}! Registration successful.`);
      })
      .addCase(registerEmployee.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
        toast.error(payload.message);
      });

    //registerManager
    builder
      .addCase(registerManager.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerManager.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        addUserToSessionStorage(state.user);
        state.error = null;
        toast.success(`Welcome ${state.user.name}! Registration successful.`);
      })
      .addCase(registerManager.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
        toast.error(payload.message);
      });

    //activateAccount
    builder
      .addCase(activateAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activateAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.error = null;
        toast.success(`Account activated successfully.`);
      })
      .addCase(activateAccount.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
        toast.error(payload.message);
      });

    //login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        addUserToLocalStorage(state.user);
        state.error = null;
        toast.success(`Welcome back ${state.user.name}!`);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.message;
        toast.error(payload.message);
      });
  },
});

export const { logout, clearTempUser } = userSlice.actions;
export default userSlice.reducer;
