import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createExpenseThunk } from "./expenseThunk";

const initialState = {
  isLoading: false,
  error: null,
  amount: "",
  description: "",
  category: "",
  expenseDate: "",
  notes: "",
};

// Async thunks
export const createExpense = createAsyncThunk(
  "expense/createExpense",
  async (expenseData, thunkAPI) => {
    return await createExpenseThunk("/expenses", expenseData, thunkAPI);
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,

  reducers: {
    handleInputValue: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },

    clearFormData: () => {
      return { ...initialState };
    },
  },

  extraReducers: (builder) => {
    // Create expense
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { handleInputValue, clearFormData } = expenseSlice.actions;

export default expenseSlice.reducer;
