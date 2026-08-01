import { useAppDispatch } from "../../store/hooks";
import { useAppSelector } from "../../store/hooks";

import { logout } from "./auth.slice";

export function useAuth() {
  const dispatch = useAppDispatch();

  const auth = useAppSelector(
    state => state.auth
  );

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    ...auth,
    logout: logoutUser,
  };
}