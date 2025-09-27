import customFetch from "../../utils/axios";
import { clearFormData } from "./expenseSlice";

export const createExpenseThunk = async (url, expense, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, expense);
    thunkAPI.dispatch(clearFormData());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Expense creation failed"
    );
  }
};

export const getExpensesThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Expense fetching failed"
    );
  }
};

export const editExpenseThunk = async (url, expense, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, expense);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Expense editing failed"
    );
  }
};
