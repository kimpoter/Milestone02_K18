import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function PrivateRoute(props) {
  const { currentUser } = useContext(AuthContext);

  return currentUser.loggedIn ? props.children : <Navigate to="/signin" />;
}

export function PublicRoute(props) {
  const { currentUser } = useContext(AuthContext);

  return !currentUser.loggedIn ? props.children : <Navigate to="/" />;
}

export function AdminRoute(props) {
  const { currentUser } = useContext(AuthContext);

  return currentUser.role === "ADMIN" ? props.children : <Navigate to="/" />;
}
