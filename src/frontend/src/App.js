import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/ScrollToTop";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import BookmarkPage from "./pages/BookmarkPage";
import SearchResult from "./pages/SearchResult";
import UserSettingPage from "./pages/UserSettingPage";
import CampusContext from "./context/CampusContext";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { PrivateRoute, PublicRoute, AdminRoute } from "./routes/Routes";

function App() {
  const [dropdownState, setDropdownState] = useState(false);
  const { campus } = useContext(CampusContext);

  function handleDropdown(e) {
    e.stopPropagation();
    setDropdownState(!dropdownState);
  }

  return (
    <div onClick={() => setDropdownState(false)}>
      <Navbar dropdownState={dropdownState} handleDropdown={handleDropdown} />
      <ScrollToTop />
      <div className="sm:pt-[100px] pt-[68px] px-16">
        <Routes>
          <Route path="/:campus/:page" element={<LandingPage />} />
          <Route exact path="/place-detail/:id" element={<PlaceDetailPage />} />
          <Route
            exact
            path="/signin"
            element={
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/user/bookmark"
            element={
              <PrivateRoute>
                <BookmarkPage />
              </PrivateRoute>
            }
          />
          <Route path={`/:campus/:page/result`} element={<SearchResult />} />
          <Route
            exact
            path="/user"
            element={
              <PrivateRoute>
                <UserSettingPage />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
          <Route path="/" element={<Navigate to={`/${campus}/1`} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
