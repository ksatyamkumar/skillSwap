import { api } from "../../api";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "./auth.types";

export const authApi = {

  login: async (
    data: LoginPayload
  ): Promise<AuthResponse> => {

    const response =
      await api.post(
        "/auth/login",
        data
      );

    return {
      success: response.data.success,
      message : response.data.message,
      user: response.data.data.user,
      token: response.data.data.accessToken,
    };
  },


  register: async (
    data: RegisterPayload
  ): Promise<AuthResponse> => {

    const response =
      await api.post(
        "/auth/register",
        data
      );

    return {
      success: response.data.success,
      message : response.data.message,
      user: response.data.data.user,
      token: response.data.data.accessToken,
    };
  },


  getMe: async (): Promise<AuthResponse> => {

    const response =
      await api.get(
        "/auth/me"
      );

    return {
      success: response.data.success,
      message : response.data.message,
      user: response.data.data.user,
      token: response.data.data.accessToken,
    };
  },

};