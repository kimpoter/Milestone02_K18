import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";

const CampusContext = createContext();

export function CampusContextProvider(props) {
  const location = useLocation();
  const [campus, setCampus] = useState(
    location.pathname.split("/")[1] === "ganesha" ||
      location.pathname.split("/")[1] === "jatinagor"
      ? location.pathname.split("/")[1]
      : "ganesha"
  );

  const value = {
    campus,
    setCampus,
  };

  return (
    <CampusContext.Provider value={value}>
      {props.children}
    </CampusContext.Provider>
  );
}

export default CampusContext;
