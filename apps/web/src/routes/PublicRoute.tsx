import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routePaths";

const isAuthenticated = false;

const PublicRoute = () => {
  return isAuthenticated ? (
    <Navigate to={ROUTES.DASHBOARD} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;