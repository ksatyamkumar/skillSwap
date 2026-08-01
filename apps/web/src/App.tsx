import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes/AppRouter";
import { useAppDispatch } from "./store/hooks";
import { initializeAuth } from "./features/auth/auth.thunks";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}