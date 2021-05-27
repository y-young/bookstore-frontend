import { useLocalStorageState } from "@umijs/hooks";
import React, { createContext, useContext } from "react";

const authContext = createContext();

// Auth context that makes auth object available to child components via useAuth().
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for child components to get the auth object
const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const [user, setUser] = useLocalStorageState("bookstore_user", null);
  const [token, setToken] = useLocalStorageState("bookstore_token", null);

  const signin = (_user, _token) => {
    setUser(_user);
    setToken(_token);
  };

  const signout = () => {
    setUser();
    setToken();
  };

  const isAdmin = () => {
    return user && user.role === "admin";
  };

  return {
    user,
    token,
    signin,
    signout,
    isAdmin,
  };
};

export default useAuth;
