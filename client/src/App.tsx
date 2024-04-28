import React from "react";
import NormalForm from "./pages/NormalForm";
import ReactHookForm from "./pages/ReactHookForm";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import BookRide from "./pages/BookRide";
import NewProtected from "./utils/NewProtected";

const App = () => {
  return (
    <>
      {/* <NormalForm /> */}
      {/* <ReactHookForm /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<NewProtected element={<UserProfilePage />} />}
          />
          <Route
            path="/home"
            element={<NewProtected element={<HomePage />} />}
          />
          <Route path="/bookride/:car_id" element={<BookRide />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
