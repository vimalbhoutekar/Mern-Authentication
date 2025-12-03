import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, getUserData, isLoggedin, userData } = useContext(AppContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef([]);

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e)=>
  {
    try
    {
      e.preventDefault();
      setIsLoading(true);
      const otp = inputRefs.current.map(input => input.value).join("");
      const {data} = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp });
      if(data.success)
      {
        toast.success(data.message);
        getUserData();
        navigate("/");

      }
      else{
        toast.error(data.message);
      }

    }
    catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate('/');
    }
  }, [isLoggedin, userData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-4 sm:left-8 top-6 w-24 sm:w-32 cursor-pointer hover:scale-105 transition-transform duration-300 z-10"
      />

      <form onSubmit={onSubmitHandler} className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10 w-full max-w-md relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center mb-2">
          Verify Email
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Enter the 6-digit verification code sent to your email
        </p>

        <div onPaste={handlePaste} className="flex justify-between gap-3 mb-8">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-12 h-12 bg-white/10 border border-white/20 text-white text-center text-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition duration-200 shadow-lg gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </button>

        <p className="text-center text-gray-400 text-xs mt-6">
          ✓ Code expires in 10 minutes
        </p>
      </form>
    </div>
  );
};

export default EmailVerify;
