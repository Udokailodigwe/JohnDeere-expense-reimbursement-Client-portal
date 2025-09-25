import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import expenseSlice from "./features/expense/expenseSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    expense: expenseSlice,
  },

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: ["persist/PERSIST"],
  //     },
  //   }),
});
