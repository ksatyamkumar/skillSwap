// import { Navigate, Outlet } from "react-router-dom";
// import { ROUTES } from "./routePaths";

// const isAuthenticated = false;

// const ProtectedRoute = () => {
//   return isAuthenticated ? (
//     <Outlet />
//   ) : (
//     <Navigate to={ROUTES.LOGIN} replace />
//   );
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();
  console.log({
  isAuthenticated,
  isLoading,
});

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}