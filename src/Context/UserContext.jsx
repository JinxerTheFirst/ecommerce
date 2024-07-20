import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0);

export default function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setuserLogin(storedToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
