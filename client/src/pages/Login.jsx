import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { data, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
        console.log(data);
        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {

        const  {data}  = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          toast.success(data.message);
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Main Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {state === "Sign Up" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-300 text-sm">
              {state === "Sign Up"
                ? "Join us and secure your account"
                : "Sign in to continue"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-5">
          {state === "Sign Up" && (
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus-within:border-purple-500/50 transition">
                <img src={assets.person_icon} alt="" className="w-5 h-5" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                  type="text"
                  value={name}
                  name="name"
                  placeholder="Full Name"
                  required
                />
              </div>
            </div>
          )}

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus-within:border-purple-500/50 transition">
              <img src={assets.mail_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                type="email"
                name="email"
                placeholder="Email Address"
                required
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-white/5 border border-white/10 focus-within:border-purple-500/50 transition">
              <img src={assets.lock_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
          {state === "Login" && (
            <div className="text-right mb-6">
              <p
                onClick={() => navigate("/reset-password")}
                className="text-sm text-purple-400 hover:text-purple-300 cursor-pointer transition duration-200"
              >
                Forgot your password?
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition duration-200 shadow-lg hover:shadow-purple-500/50 gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {state === "Sign Up" ? "Creating Account..." : "Signing In..."}
              </>
            ) : (
              state === "Sign Up" ? "Create Account" : "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* Toggle */}
          <div className="text-center">
            {state === "Sign Up" ? (
              <p className="text-gray-300 text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-purple-400 hover:text-purple-300 cursor-pointer font-semibold transition duration-200"
                >
                  Sign In
                </span>
              </p>
            ) : (
              <p className="text-gray-300 text-sm">
                Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-purple-400 hover:text-purple-300 cursor-pointer font-semibold transition duration-200"
                >
                  Create One
                </span>
              </p>
            )}
          </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-400 text-xs mt-6">
          🔒 Your data is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default Login;
