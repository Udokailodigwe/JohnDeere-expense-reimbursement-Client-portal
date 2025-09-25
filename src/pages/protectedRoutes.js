import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/activate-account?form=login" />;
  }
  return children;
};

export default ProtectedRoutes;
