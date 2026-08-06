

import api from "../../api/axios";
import type { UserProfile } from "./profile.types";
import type { UpdateProfileFormValues } from "./profile.validation";

interface ProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export async function getMyProfile() {
  const response = await api.get<ProfileResponse>(
    "/users/me"
  );

  return response.data.data;
}

export async function updateProfile(
  values: UpdateProfileFormValues
) {
  const response =
    await api.patch<UpdateProfileResponse>(
      "/users/me",
      values
    );

  return response.data.data;
}

export const uploadAvatarApi = async (
  file: File
) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.patch(
    "/users/me/avatar",
    formData
  );

  return response.data.data;
};