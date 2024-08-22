import { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
  userId: "",
  email: "",
  username: "",
  accessToken: "",
  accountStatus: "",
  isAuthenticated: false,
  changeAuthState: (authState = {}) => null,
  logout: () => null,
});

export default function AuthContextProvider(props) {
  const [authState, setAuthState] = useState(() =>{

    const localeState = localStorage.getItem("authState");

    if(localeState){
      return JSON.parse(localeState);
    }
    
    return {};
  });


  const changeAuthState = (state) => {
    localStorage.setItem("authState", JSON.stringify(state));
    setAuthState(state);
  };

  const logout = () => {
    localStorage.removeItem("authState");
    setAuthState({});
  };

  const contextData = {
    userId: authState._id,
    email: authState.email,
    username: authState.username,
    accessToken: authState.accessToken,
    accountStatus: authState.accountStatus,
    isAuthenticated: !!authState.email,
    changeAuthState,
    logout
  };

  return (
    <AuthContext.Provider value={contextData}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const authData = useContext(AuthContext);

  return authData;
}
