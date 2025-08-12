import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin,setIsLoggedin] = useState(false);
    const [userData,setUserData] = useState(null);
    const getUserData = async () =>
    {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/data`);
        data.success ? setUserData(data.userData) : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData
  };
  return <AppContext.Provider value={value}>{children}
  </AppContext.Provider>;
};
