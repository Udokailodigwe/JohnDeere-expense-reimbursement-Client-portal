import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      .addCase(registerEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        addUserToSessionStorage(state.user);
        state.error = null;
      })
      .addCase(registerEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //registerManager
    builder
      .addCase(registerManager.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerManager.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        addUserToSessionStorage(state.user);
        state.error = null;
      })
      .addCase(registerManager.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //activateAccount
    builder
      .addCase(activateAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activateAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.user = action.payload.user;
        addUserToLocalStorage(state.user);
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearTempUser } = userSlice.actions;
export default userSlice.reducer;
