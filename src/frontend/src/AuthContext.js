import { createContext, useState, useEffect } from "react";
import axios from "./api/axios";
const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState({ loggedIn: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
          withCredentials: true,
        });
        setCurrentUser({ loggedIn: true, ...res.data.data });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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
