import React, { useContext, useState } from "react";
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
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32" />

      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center bg-black text-white rounded-full relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10 ">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm ">
              {!userData.isAccountVerified && (
                <li
                  className={`py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10 flex items-center ${isVerifyLoading ? 'opacity-50' : ''}`}
                  onClick={isVerifyLoading ? undefined : sendVerificationOtp}
                >
                  {isVerifyLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isVerifyLoading ? "Sending..." : "Verify Account"}
                </li>
              )}
              <li
                onClick={isLogoutLoading ? undefined : logout}
                className={`py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10 flex items-center ${isLogoutLoading ? 'opacity-50' : ''}`}
              >
                {isLogoutLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isLogoutLoading ? "Logging out..." : "Logout"}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />{" "}
        </button>
      )}
    </div>
  );
};

export default Navbar;
