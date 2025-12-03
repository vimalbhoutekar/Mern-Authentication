import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const ResetPassword = () => {

  const {backendUrl} = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);

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

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      setIsResetLoading(true);
      const {data} = await axios.post(`${backendUrl}/api/auth/reset-password`, { email, newPassword, otp });
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsResetLoading(false);
    }
  }

  const onSubmitEmail = async (e) =>
  {
    e.preventDefault();
    try {
      setIsEmailLoading(true);
      const {data} = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        setIsEmailSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsEmailLoading(false);
    }
  }

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    setOtpError("");
    try {
      setIsOtpLoading(true);
      const otpArray = inputRefs.current.map(input => input.value).join("");
      setOtp(otpArray);
      // Verify OTP with backend
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-reset-otp`, { email, otp: otpArray });
      if (data.success) {
        setIsOtpVerified(true);
        toast.success(data.message);
      } else {
        setIsOtpVerified(false);
        setOtpError(data.message || "Invalid OTP");
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      setIsOtpVerified(false);
      setOtpError(error?.response?.data?.message || "Invalid OTP");
      toast.error(error?.response?.data?.message || "Invalid OTP");
    } finally {
      setIsOtpLoading(false);
    }
  }

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

      <div className="w-full max-w-md relative z-10">

      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center mb-2">
            Reset Password
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Enter your email to receive a password reset code
          </p>

          <div className="relative group mb-6">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus-within:border-purple-500/50 transition">
              <img className="w-5 h-5" src={assets.mail_icon} alt="" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isEmailLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition duration-200 shadow-lg gap-2"
          >
            {isEmailLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Code...
              </>
            ) : (
              "Send Reset Code"
            )}
          </button>
        </form>
      )}

      {!isOtpVerified && isEmailSent && (
        <form
          onSubmit={onSubmitOTP}
          className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center mb-2">
            Verify Code
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Enter the 6-digit code sent to your email
          </p>
          {otpError && (
            <p className="text-center text-red-400 text-sm mb-4">{otpError}</p>
          )}
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
            disabled={isOtpLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition duration-200 shadow-lg gap-2"
          >
            {isOtpLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>
        </form>
      )}

      {isOtpVerified && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center mb-2">
            Set New Password
          </h1>
          <p className="text-gray-300 text-center mb-8">
            Create a strong new password for your account
          </p>

          <div className="relative group mb-6">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus-within:border-purple-500/50 transition">
              <img className="w-5 h-5" src={assets.lock_icon} alt="" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isResetLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition duration-200 shadow-lg gap-2"
          >
            {isResetLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      )}

      <p className="text-center text-gray-400 text-xs mt-6 relative z-10">
        🔒 Your password is secure and encrypted
      </p>
      </div>
    </div>
  );
};

export default ResetPassword;
