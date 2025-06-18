import React from "react";
import { createContext, useState, useEffect } from "react";
<<<<<<< HEAD
import getDataUserLoggedService from "../services/getDataUserLoggedService.js";
=======
import getDataUserLoggedService from "../services/users/getDataUserLoggedService";
>>>>>>> 4bba7076b1112f7c151bbae1db7ca3a85b33e893

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
<<<<<<< HEAD
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    const getDataUserLogged = async () => {
      try {
        const data = await getDataUserLoggedService({ token });

        setUserLogged(data);
      } catch (error) {
        console.log(error);
      }
    };

    getDataUserLogged();
  }, [token]);

  const logout = () => {
    setToken(null);
    setUserLogged(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, userLogged, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
=======

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userLogged, setUserLogged] = useState(null);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    useEffect(() => {

        const getDataUserLogged = async () => {
            try {
                
                const data = await getDataUserLoggedService({ token });
                
                setUserLogged(data);

            } catch (error) {
                console.log(error);
            }
        }

        getDataUserLogged();

    },[token]);

    const logout = () => {
        setToken(null);
        setUserLogged(null);
    }

    return (
        <AuthContext.Provider value={{token, setToken, userLogged, logout}}>
            { children }
        </AuthContext.Provider>
    )
}





export {AuthContext , AuthContextProvider};
>>>>>>> 4bba7076b1112f7c151bbae1db7ca3a85b33e893
