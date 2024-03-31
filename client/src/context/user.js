import React, { createContext, useContext, useEffect, useState } from "react";


const userContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    let token;
    useEffect(() => {
        const tkn = sessionStorage.getItem('token') || localStorage.getItem('token')
        token = JSON.parse(tkn);
    }, [])

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        token,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const UserState = () => {
  return useContext(userContext);
};

export default UserProvider;