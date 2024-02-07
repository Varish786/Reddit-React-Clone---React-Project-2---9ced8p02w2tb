// StateProvider.js
import { createContext, useContext, useState } from "react";

export const stateContext = createContext();

const StateProvider = ({ children }) => {
  const [isloggedin, Setisloggedin] = useState(false);
  const [LoginJwt, setLoginjwt] = useState("");
  const [LoginUserId, SetLoginUserId] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(localStorage.getItem("login") === 'true');


  return (
    <stateContext.Provider
      value={{
        isloggedin,
        Setisloggedin,
        LoginJwt,
        setLoginjwt,
        LoginUserId,
        SetLoginUserId,
        isUserLoggedIn, setIsUserLoggedIn
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export const useStateValue = () => useContext(stateContext);

export default StateProvider;