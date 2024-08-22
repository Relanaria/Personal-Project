import { login, register, logout } from "../api/auth-api";
import { useState, useEffect } from "react";

import { useAuthContext } from "../contexts/AuthContext";

export const useLogin = () => {
  const authState = useAuthContext();

  const loginHandler = async (email, password) => {
    const result = await login(email, password);
    if (result.code == 403) {
      throw new Error(result.message);
    }

    //TODO update application state
    authState.changeAuthState(result);
  };

  return loginHandler;
};


export const useRegister = () =>{
  const authState = useAuthContext();

  const registerHandler = async({ confirmPassword: _, ...userData}) =>{
   
    //TODO remove password from authState
    const result = await register(userData);
    if(result.code == 409){
      throw new Error(result.message);
    };

    authState.changeAuthState(result);
  }

  return registerHandler;
};

export const useLogout = () =>{
  const authState = useAuthContext();

  const logoutHandler = async (accessToken) =>{
    
    const result = await logout(accessToken);

    if(result.code == 403){
      //Access token has expired
      localStorage.clear();
      authState.logout();
    }
    
    if(result.status == 204){
      authState.logout();
    }
  }

  return logoutHandler;
}