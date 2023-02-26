import React, { useState, useEffect, useContext, createContext } from "react";

interface AuthContextValues {
  isAuthenticated: boolean;
  userInfo: any;
}

interface AuthContextProviderProps {
  children: JSX.Element;
}

const defaultAuthContextValues: AuthContextValues = {
  isAuthenticated: false,
  userInfo: {}
};

export const AuthContext = createContext<AuthContextValues>(
  defaultAuthContextValues
);


export const AuthProvider = (props: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo }}>
      {props.children}
    </AuthContext.Provider>
  );
};