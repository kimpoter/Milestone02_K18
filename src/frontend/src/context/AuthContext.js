import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState({ loggedIn: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      setLoading(true);
      axios
        .get("/auth/user")
        .then((res) => {
          console.log(res);
          setCurrentUser({ loggedIn: true, ...res.data.data });
        })
        .catch((err) => {
          console.log(err);
          setCurrentUser({ loggedIn: false });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
