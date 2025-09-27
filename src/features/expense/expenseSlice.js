import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  createExpenseThunk,
  getExpensesThunk,
  editExpenseThunk,
} from "./expenseThunk";

const initialState = {
  formData: {
    amount: "",
    description: "",
    category: "",
    expenseDate: "",
    notes: "",
  },
  isLoading: false,
  error: null,
  expenses: [],
  totalExpenses: 0,
};

// Async thunks
export const createExpense = createAsyncThunk(
  "expense/createExpense",
  async (expenseData, thunkAPI) => {
    return await createExpenseThunk("/expenses", expenseData, thunkAPI);
  }
);

export const getExpenses = createAsyncThunk(
  "expense/getExpenses",
  async (thunkAPI) => {
    return await getExpensesThunk("/expenses", thunkAPI);
  }
);

export const editExpense = createAsyncThunk(
  "expense/editExpense",
  async (expenseData, thunkAPI) => {
    const { id, ...updateData } = expenseData;
    return await editExpenseThunk(`/expenses/${id}`, updateData, thunkAPI);
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,

  reducers: {
    handleInputValue: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },

    clearFormData: () => {
      return { ...initialState };
    },

    setFormValues: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    // Create expense
    builder
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        toast.success("Expense created successfully");
      })
      .addCase(createExpense.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload);
      });

    // Get expenses
    builder
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.expenses = payload.expenses;
        state.totalExpenses = payload.totalExpenses;
        state.error = null;
      })
      .addCase(getExpenses.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload);
      });

    // Edit expense
    builder
      .addCase(editExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editExpense.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        toast.success("Expense edited successfully");
      })
      .addCase(editExpense.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(state.error);
        toast.error(payload);
      });
  },
});

export const { handleInputValue, clearFormData, setFormValues } =
  expenseSlice.actions;

export default expenseSlice.reducer;
