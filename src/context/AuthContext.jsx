import React, { createContext, useContext, useEffect, useState } from "react";
import * as jwt_decode from "jwt-decode";
import { getTokenLocal, removeTokenLocal, setTokenLocal } from "./Auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    // Initialize user from local storage when the component mounts
    const userInfo = localStorage.getItem('user');
    return userInfo ? JSON.parse(userInfo) : null;
  });

  const [token, setToken] = useState(null);
  useEffect(() => {
    // Initialize token from local storage when the component mounts
    // const storedToken = localStorage.getItem('token');
    const storedToken = getTokenLocal();
    setToken(storedToken);
  }, []);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    setTokenLocal(token);
    localStorage.setItem('user', JSON.stringify(user)); // Store user as JSON string
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeTokenLocal();
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    if (!token) {
      return false;
    }
    try {
      const decodedToken = jwt_decode(token, process.env.REACT_APP_JWT_SECRET);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
