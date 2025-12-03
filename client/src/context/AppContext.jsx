import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";



export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin,setIsLoggedin] = useState(false);
    const [userData,setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getUserData = async () =>
    {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/user/data`);
        data.success ? setUserData(data.userData) : toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    const getAuthStatus = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          setUserData(data.userData);
        } else {
          setIsLoggedin(false);
          setUserData(null);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };


    useEffect(() => {
      getAuthStatus();
    }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    isLoading
  };
  return <AppContext.Provider value={value}>{children}
  </AppContext.Provider>;
};
