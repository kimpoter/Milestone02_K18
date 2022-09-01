import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CampusContextProvider } from "./context/CampusContext";
import { PlaceContextProvider } from "./context/PlaceContext";
import { AuthContextProvider } from "./context/AuthContext";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider position="top-right">
        <AuthContextProvider>
          <CampusContextProvider>
            <PlaceContextProvider>
              <App />
            </PlaceContextProvider>
          </CampusContextProvider>
        </AuthContextProvider>
      </NotificationsProvider>
    </MantineProvider>
  </BrowserRouter>
);
