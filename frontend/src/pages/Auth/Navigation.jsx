import { useState, useEffect, useRef } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch, createDispatchHook } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/feactures/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdowm = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Route change pe dropdown close
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  // Outside click pe dropdown close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="bg-[#0f0f0f] border w-[99.9%] px-16 py-5 mb-[1px]">
        
      <section className="flex justify-between items-center">
        {/* LEFT ICONS */}
        <div className="flex justify-center items-center">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="fill-white mr-2" size={26} />
            <span className="hidden nav-items-name text-white ">
              Home
            </span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center transition-transform transform
            hover:translate-x-2 ml-[1rem]"
          >
            <MdOutlineLocalMovies
              className="fill-white mr-2"
              size={26}
            />
            <span className="hidden nav-item-name mt-[3rem]">SHOP</span>
          </Link>
        </div>
        {/* USER DROPDOWN */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={toggleDropdowm}
            className="text-white focus:outline-none flex items-center"
          >
            {userInfo && <span>{userInfo.username}</span>}

            {userInfo && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-[-2rem] w-[10rem]
              space-y-2 bg-white text-gray-600 shadow-lg rounded
              ${!userInfo.isAdmin ? "-top-20" : "-top-24"}`}
            >
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="flex">
              <li>
                <Link
                  to="/login"
                  className="flex items-center transition-transform transform 
                  hover:translate-x-2"
                >
                  <AiOutlineLogin
                    className="fill-white mr-2 mt-[4px]"
                    size={26}
                  />
                  <span className="hidden nav-item-name">LOGIN</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center transition-transform transform 
                  hover:translate-x-2 ml-[1rem]"
                >
                  <AiOutlineUserAdd className="fill-white" size={26} />
                  <span className="hidden nav-item-name">Register</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
