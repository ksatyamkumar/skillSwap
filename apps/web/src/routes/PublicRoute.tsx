import { Navigate } from "react-router-dom";

import { useAuth } from "../features/auth/useAuth";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({
  children,
}: PublicRouteProps) {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}