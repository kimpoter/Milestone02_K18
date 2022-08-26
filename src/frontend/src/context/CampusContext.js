import { createContext, useState } from "react";

const CampusContext = createContext();

export function CampusContextProvider(props) {
  const [campus, setCampus] = useState("ganesha");

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
