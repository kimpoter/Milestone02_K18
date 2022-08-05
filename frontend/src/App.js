import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [ dropdownState, setDropdownState ] = useState(false)

  function handleDropdown(e) {
    e.stopPropagation()
    setDropdownState(!dropdownState)
}

  return (
    <div onClick={() => setDropdownState(false)}>
      <Navbar dropdownState={dropdownState} handleDropdown={handleDropdown}/>
      <ScrollToTop />
      <div className="pt-[100px]">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
