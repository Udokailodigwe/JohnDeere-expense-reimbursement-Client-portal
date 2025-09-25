import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import links from "../utils/links";

const Navlinks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/activate-account?form=login");
  };

  return (
    <nav className="space-y-2">
      {links.map((link) => {
        const { text, path, id, icon } = link;

        if (text === "Logout") {
          return (
            <button
              key={id}
              onClick={handleLogoutClick}
              className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 group text-slate-300 hover:bg-slate-700 hover:text-white hover:shadow-md w-full"
            >
              <span className="text-xl mr-3 transition-transform duration-200 group-hover:scale-110">
                {icon}
              </span>
              <span className="font-medium">{text}</span>
            </button>
          );
        }

        return (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-gradient-to-r from-green-600 to-yellow-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white hover:shadow-md"
              }`
            }
          >
            <span className="text-xl mr-3 transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
            <span className="font-medium">{text}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navlinks;
