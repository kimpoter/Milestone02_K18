import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "./api/axios";
const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState({ loggedIn: null });
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    console.log(`Bearer ${Cookies.get("ITBFood_AT")}`);
    const res = await axios.get("/auth/user", {
      headers: { Authorization: `Bearer ${Cookies.get("ITBFood_AT")}` },
      withCredentials: true,
    });
    console.log(res);
  }

  fetchData();
  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
