import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import { ROUTES } from "./routePaths";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: 
        <PublicRoute>
      <Login />
    </PublicRoute>,
      },
      {
        path: ROUTES.REGISTER,
        element: 
        <PublicRoute>
      <Register />
    </PublicRoute>,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);