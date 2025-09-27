import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/activate-account?form=login");
  };

  useEffect(() => {
    if (!isDropdownOpen) return;
    const closeOnOutsideClick = (e) =>
      !e.target.closest(".dropdown") && setIsDropdownOpen(false);
    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [isDropdownOpen]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 lg:hidden"></div>

        <div className="flex-1 flex justify-center lg:justify-start">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800">
            DASHBOARD
          </h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Search - Hidden on very small screens */}
          <div className="hidden sm:block relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-32 sm:w-48 lg:w-64 px-3 sm:px-4 py-2 pl-8 sm:pl-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-2 sm:left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs sm:text-sm font-medium text-gray-700">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role?.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <a
                  href="/dashboard/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="/dashboard/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <hr className="my-1" />
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
