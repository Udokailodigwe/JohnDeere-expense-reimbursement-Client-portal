import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import ActivateAccount from "./pages/activate-account";
import Error from "./pages/error";
import ToastNotification from "./assets/Toaster";
import SharedLayout from "./pages/dashboard/sharedLayout";
import AddExpenses from "./pages/dashboard/addExpenses";
import GetExpenses from "./pages/dashboard/getExpenses";
import Home from "./pages/dashboard/home";
import ProtectedRoutes from "./pages/protectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <SharedLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="index" element={<Home />} />
          <Route path="add-expense" element={<AddExpenses />} />
          <Route path="edit-expense/:expenseId" element={<AddExpenses />} />
          <Route path="my-expenses" element={<GetExpenses />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="activate-account" element={<ActivateAccount />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastNotification />
    </Router>
  );
}

export default App;
