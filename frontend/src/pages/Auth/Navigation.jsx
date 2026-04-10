import { useState, useEffect, useRef } from "react";
import { AiOutlineHome, AiOutlineLogin, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

  const toggleDropdowm = () => setDropdownOpen((prev) => !prev);

  useEffect(() => { setDropdownOpen(false); }, [location]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) { console.error(error); }
  };

  return (
    // FIX: 'fixed' ki jagah 'sticky' use karein aur width full rakhein
    <nav className="bg-[#0f0f0f] border-b border-[#242424] sticky top-0 z-50 w-full px-6 md:px-16 py-4">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        
        {/* LEFT ICONS */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center text-white hover:text-blue-500 transition-colors">
            <AiOutlineHome size={24} />
            <span className="ml-2 font-semibold">Home</span>
          </Link>

          <Link to="/movies" className="flex items-center text-white hover:text-blue-500 transition-colors">
            <MdOutlineLocalMovies size={24} />
            <span className="ml-2 font-semibold">Browse</span>
          </Link>
        </div>

        {/* RIGHT SECTION (User/Auth) */}
        <div ref={dropdownRef} className="relative">
          {userInfo ? (
            <>
              <button onClick={toggleDropdowm} className="text-white flex items-center gap-2 hover:bg-gray-800 px-4 py-2 rounded-lg transition-all">
                <span className="font-bold">{userInfo.username}</span>
                <svg className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-2xl rounded-xl py-2 z-[60]">
                  {userInfo.isAdmin && (
                    <li><Link to="/admin/movies/dashboard" className="block px-4 py-3 hover:bg-gray-100 font-medium">Dashboard</Link></li>
                  )}
                  <li><Link to="/profile" className="block px-4 py-3 hover:bg-gray-100 font-medium">Profile</Link></li>
                  <li className="border-t border-gray-100 mt-1">
                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-bold transition-colors">Logout</button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="flex items-center text-white hover:text-blue-500">
                <AiOutlineLogin size={22} className="mr-2" />
                <span className="text-sm font-bold">LOGIN</span>
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;