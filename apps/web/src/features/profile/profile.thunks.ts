import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMyProfile, updateProfile, uploadAvatarApi } from "./profile.api";
import type { UpdateProfileFormValues } from "./profile.validation";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    return await getMyProfile();
  }
);

export const updateMyProfile =
  createAsyncThunk(
    "profile/updateProfile",

    async (
      values: UpdateProfileFormValues
    ) => {
      return await updateProfile(values);
    }
  );

  export const uploadAvatar =
  createAsyncThunk(
    "profile/uploadAvatar",

    async (
      file: File,
      thunkAPI
    ) => {
      try {
        return await uploadAvatarApi(file);
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ??
            "Avatar upload failed"
        );
      }
    }
  );