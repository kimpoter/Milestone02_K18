import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [currentUser, setCurrentUser] = useState({ loggedIn: null });
  const [loading, setLoading] = useState(true);

  function getUser() {
    setLoading(true);
    axios
      .get("/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      })
      .then((res) => {
        setCurrentUser({ loggedIn: true, ...res.data.data });
      })
      .catch((err) => {
        setCurrentUser({ loggedIn: false });
      })
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    getUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
