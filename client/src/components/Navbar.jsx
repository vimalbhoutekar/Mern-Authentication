import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const sendVerificationOtp = async () => {
    try {
      setIsVerifyLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsVerifyLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLogoutLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      data.success && setIsLoggedin(false);
      data.success && setUserData(null);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLogoutLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-20">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32 cursor-pointer hover:scale-105 transition-transform duration-300" />

      {userData ? (
        <div className="flex items-center gap-6">
          {/* User Badge */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/15 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {userData.name[0].toUpperCase()}
            </div>
            <span className="text-white text-sm font-medium">{userData.name.split(' ')[0]}</span>
            {!userData.isAccountVerified && (
              <span className="px-2 py-1 bg-amber-500/30 text-amber-200 text-xs rounded-full font-semibold whitespace-nowrap">
                ⚠ Verify
              </span>
            )}
            {userData.isAccountVerified && (
              <span className="px-2 py-1 bg-green-500/30 text-green-200 text-xs rounded-full font-semibold whitespace-nowrap">
                ✓ Verified
              </span>
            )}
          </div>

          {/* Dropdown Menu (click to open) */}
          <div ref={dropdownRef} className="w-10 h-10 flex justify-center items-center bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded-full relative cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-110" onClick={() => setIsDropdownOpen((v) => !v)} tabIndex={0}>
            {userData.name[0].toUpperCase()}
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 z-50 rounded-lg pt-2">
                <div className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl overflow-hidden min-w-48">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-gray-900 font-semibold text-sm">{userData.name}</p>
                    <p className="text-gray-600 text-xs">{userData.email}</p>
                  </div>
                  <ul className="list-none m-0 p-2">
                    {!userData.isAccountVerified && (
                      <li
                        className={`px-4 py-3 hover:bg-blue-50 cursor-pointer rounded transition flex items-center gap-2 ${isVerifyLoading ? 'opacity-50 pointer-events-none' : ''}`}
                        onClick={isVerifyLoading ? undefined : sendVerificationOtp}
                      >
                        {isVerifyLoading && (
                          <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        <span className="text-gray-700 text-sm font-medium">
                          {isVerifyLoading ? "Sending..." : "Verify Account"}
                        </span>
                      </li>
                    )}
                    <li
                      onClick={isLogoutLoading ? undefined : logout}
                      className={`px-4 py-3 hover:bg-red-50 cursor-pointer rounded transition flex items-center gap-2 border-t border-gray-200 mt-2 pt-2 ${isLogoutLoading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      {isLogoutLoading && (
                        <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      <span className="text-red-600 text-sm font-medium">
                        {isLogoutLoading ? "Logging out..." : "Logout"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border-2 border-white/40 hover:border-white/60 rounded-full px-6 py-2 text-white hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-sm"
        >
          Sign In
          <img src={assets.arrow_icon} alt="" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
