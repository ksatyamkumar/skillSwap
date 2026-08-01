import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async () => {
    const token = localStorage.getItem("token");

    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      localStorage.removeItem("token");

      return {
        user: null,
        token: null,
      };
    }

    return {
      user: null,
      token,
    };
  }
);