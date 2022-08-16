import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./AuthContext";
import { CampusContextProvider } from "./CampusContext";
import { PlaceContextProvider } from "./PlaceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CampusContextProvider>
      <PlaceContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </PlaceContextProvider>
    </CampusContextProvider>
  </BrowserRouter>
);
