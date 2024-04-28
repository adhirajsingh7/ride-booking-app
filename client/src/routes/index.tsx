import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../utils/PrivateRoutes";
import { lazy } from "react";
import RegisterCarPage from "../pages/RegisterCarPage";
import RidesPage from "../pages/RidesPage";
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const BookRide = lazy(() => import("../pages/BookRide"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace={true} />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bookride/:car_id",
    element: <BookRide />,
  },
  {
    path: "/registercar/:user_id",
    element: <RegisterCarPage />,
  },
  {
    path: "/rides",
    element: <RidesPage />,
  },
]);

export default router;
