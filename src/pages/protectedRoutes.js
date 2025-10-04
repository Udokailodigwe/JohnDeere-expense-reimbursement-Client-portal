import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, roles }) => {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/activate-account?form=login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/index" replace />;
  }

  return children;
};
export default ProtectedRoutes;
