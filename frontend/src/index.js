import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";
import { CampusContextProvider } from "./CampusContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CampusContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </CampusContextProvider>
  </BrowserRouter>
);
