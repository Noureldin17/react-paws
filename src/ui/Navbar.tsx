import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import tempProfile from "../assets/temp-profile.jpeg"
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector((state: RootState) => state.auth);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    setDropdownOpen(false);
    navigate("/login")
  };

  return (
    <nav className="sticky top-0 bg-cream shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-gray-400 text-xl font-bold">
          <span className="text-primary">Pet</span>Care
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-primary"
          >
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Search Bar */}
        <form className="hidden lg:block">
          <input
            className="w-28 rounded-full px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-secondary text-gray-700 sm:w-64 sm:focus:w-72"
            placeholder="Search"
          />
        </form>

        {/* Navigation Links */}
        <ul className="hidden lg:flex space-x-4 text-gray-500 items-center">
          {["/", "/store", "/tips", "/adoption"].map((path, index) => (
            <li key={index}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "underline text-black p-1.5" : "p-1.5"
                }
              >
                {path === "/"
                  ? "Home"
                  : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
              </NavLink>
            </li>
          ))}

          {/* Conditional Rendering for Login/Avatar */}
          {!loggedIn ? (
            <li className="ml-auto">
              <NavLink to="/login">
                <div className="p-1.5 ps-6 pe-6 bg-primary rounded-3xl text-white transform transition duration-300 ease-in-out active:scale-90 hover:bg-[#D77A48] ml-8">
                  Login
                </div>
              </NavLink>
            </li>
          ) : (
            <li className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer "
                onClick={toggleDropdown}
              >
                {user?.profileImage ? <img
                  src={`data:image/jpeg;base64,${user?.profileImage}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                :<img
                src={tempProfile}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
                }
                <span className="text-gray-500 text-xs">▼</span>
              </div>

              {dropdownOpen && (
  <ul className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 text-gray-700 z-50">
    <li className="hover:bg-gray-100 cursor-pointer">
      <NavLink
        className="block px-4 py-2 text-left"
        onClick={() => setDropdownOpen(false)}
        to="/profile"
      >
        Profile
      </NavLink>
    </li>
    <li
      className="hover:bg-gray-100 cursor-pointer"
      onClick={handleLogout}
    >
      <span className="block px-4 py-2 text-left">Logout</span>
    </li>
  </ul>
)}

            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-cream shadow-lg z-20 lg:hidden">
          <ul className="flex flex-col items-center space-y-4 py-6">
            {["/", "/store", "/tips", "/adoption"].map((path, index) => (
              <li key={index}>
                <NavLink to={path} onClick={toggleMenu}>
                  <span className="text-gray-600">
                    {path === "/"
                      ? "Home"
                      : path.substring(1).charAt(0).toUpperCase() +
                        path.substring(2)}
                  </span>
                </NavLink>
              </li>
            ))}
            {!loggedIn && (
              <li>
                <NavLink to="/login" onClick={toggleMenu}>
                  <div className="px-6 py-2 bg-primary rounded-3xl text-white">
                    Login
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
