import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routePaths";

const isAuthenticated = false;

const ProtectedRoute = () => {
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default ProtectedRoute;