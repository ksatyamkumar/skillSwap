// import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import { fetchProfile, updateMyProfile } from "../features/profile/profile.thunks";

import {
  selectProfile,
  selectProfileError,
  selectProfileLoading,
} from "../features/profile/profile.selectors";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import SkillSection from "../components/profile/SkillSection";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { UpdateProfileFormValues } from "@/features/profile/profile.validation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditProfileForm from "@/components/profile/EditProfileForm";
import toast from "react-hot-toast";
import AvatarUpload from "@/components/profile/AvatarUpload";
import { uploadAvatar } from "../features/profile/profile.thunks";

export default function Profile() {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectProfile);

  const isLoading = useAppSelector(selectProfileLoading);

  const error = useAppSelector(selectProfileError);

  const [open, setOpen] =useState(false);

const handleUpdate = async (
  values: UpdateProfileFormValues
) => {
  try {
    await dispatch(
      updateMyProfile(values)
    ).unwrap();

    toast.success(
      "Profile updated successfully"
    );

    setOpen(false);

  } catch (error) {
    toast.error(
      "Failed to update profile"
    );

    console.error(error);
  }
};

const handleAvatarUpload =
async (file: File) => {

  try {

  await dispatch(
    uploadAvatar(file)
  ).unwrap();

  toast.success(
    "Avatar updated successfully"
  );

} catch (error: any) {

  toast.error(
    error
  );

}

};

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-lg font-medium">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-3xl rounded-lg border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p>Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <AvatarUpload
  avatar={profile?.avatar}
  isLoading={false}
  onUpload={handleAvatarUpload}
/>

      {/* <ProfileHeader profile={profile} /> */}

      <ProfileInfo profile={profile} />

      <SkillSection
        title="Skills Offered"
        skills={profile.skillsOffered}
      />

      <SkillSection
        title="Skills Wanted"
        skills={profile.skillsWanted}
      />

      <div className="flex justify-end">
        {/* <button
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Edit Profile
        </button> */}
        <Button onClick={() => setOpen(true)}>
  Edit Profile
</Button>

<Dialog
  open={open}
  onOpenChange={setOpen}
>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>
        Edit Profile
      </DialogTitle>
    </DialogHeader>

    <EditProfileForm
      profile={profile}
      onSubmit={handleUpdate}
      isLoading={isLoading}
    />
  </DialogContent>
</Dialog>
      </div>

    </div>
  );
}