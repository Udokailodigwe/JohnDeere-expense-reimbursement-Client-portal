import customFetch from "../../utils/axios";
import toast from "react-hot-toast";
import { clearFormData } from "./expenseSlice";

export const createExpenseThunk = async (url, expense, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, expense);
    toast.success("Expense created successfully");
    thunkAPI.dispatch(clearFormData());
    return resp.data;
  } catch (error) {
    toast.error(error.response?.data?.msg || "Expense creation failed");
    return thunkAPI.rejectWithValue(
      error.response?.data?.msg || "Expense creation failed"
    );
  }
};
