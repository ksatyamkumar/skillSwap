import { createSlice } from "@reduxjs/toolkit";

import type { UserProfile } from "./profile.types";
import { fetchProfile, updateMyProfile, uploadAvatar } from "./profile.thunks";

interface ProfileState {
  profile: UserProfile | null;

  isLoading: boolean;

  error: string | null;
}

const initialState: ProfileState = {
  profile: null,

  isLoading: false,

  error: null,
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;

        state.profile = action.payload;
      })

      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;

        state.error = "Failed to load profile";
      })

      .addCase(
  updateMyProfile.pending,
  (state) => {
    state.isLoading = true;
  }
)

.addCase(
  updateMyProfile.fulfilled,
  (state, action) => {
    state.isLoading = false;

    state.profile = action.payload;
  }
)

.addCase(
  updateMyProfile.rejected,
  (state) => {
    state.isLoading = false;

    state.error =
      "Failed to update profile";
  }
)


.addCase(
  uploadAvatar.pending,
  (state) => {
    state.isLoading = true;
  }
)

.addCase(
  uploadAvatar.fulfilled,
  (state, action) => {

    state.profile = action.payload;

    state.isLoading = false;
  }
)

.addCase(
  uploadAvatar.rejected,
  (state) => {

    state.isLoading = false;

  }
);
      
  },
});

export default profileSlice.reducer;