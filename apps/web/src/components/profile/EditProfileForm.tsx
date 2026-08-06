import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "../../features/profile/profile.validation";

import type { UserProfile } from "../../features/profile";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import {
 useState
} from "react";
import SkillInput from "./SkillInput";

interface Props {
  profile: UserProfile;

  onSubmit: (
    values: UpdateProfileFormValues
  ) => void;

  isLoading?: boolean;
}

export default function EditProfileForm({
  profile,
  onSubmit,
  isLoading = false,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),

    defaultValues: {
      fullName: profile.fullName,
      bio: profile.bio,
      city: profile.city,
      country: profile.country,
      skillsOffered: profile.skillsOffered,
      skillsWanted: profile.skillsWanted,
      experienceYears: profile.experienceYears,
      availability: profile.availability,
    },
  });

  const [skillsOffered,setSkillsOffered]
=
useState(
 profile.skillsOffered
);


const [skillsWanted,setSkillsWanted]
=
useState(
 profile.skillsWanted
);

  return (
    <form
      onSubmit={handleSubmit((values)=>{
   onSubmit({
     ...values,
     skillsOffered,
     skillsWanted,
   });
 })
}
      className="space-y-6"
    >
      {/* Full Name */}

      <div>

        <label className="mb-2 block font-medium">
          Full Name
        </label>

        <Input
          {...register("fullName")}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.fullName?.message}
        </p>

      </div>

      {/* Bio */}

      <div>

        <label className="mb-2 block font-medium">
          Bio
        </label>

        <Textarea
          rows={4}
          {...register("bio")}
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.bio?.message}
        </p>

      </div>

      {/* City */}

      <div>

        <label className="mb-2 block font-medium">
          City
        </label>

        <Input
          {...register("city")}
        />

      </div>

      {/* Country */}

      <div>

        <label className="mb-2 block font-medium">
          Country
        </label>

        <Input
          {...register("country")}
        />

      </div>

      {/* Experience */}

      <div>

        <label className="mb-2 block font-medium">
          Experience
        </label>

        <Input
          type="number"
          {...register(
            "experienceYears",
            {
              valueAsNumber: true,
            }
          )}
        />

      </div>

      {/* Availability */}

      <div>

        <label className="mb-2 block font-medium">
          Availability
        </label>

        <select
          className="w-full rounded-md border p-2"
          {...register("availability")}
        >
          <option value="FLEXIBLE">
            Flexible
          </option>

          <option value="FULL_TIME">
            Full Time
          </option>

          <option value="PART_TIME">
            Part Time
          </option>

          <option value="WEEKENDS">
            Weekends
          </option>

        </select>

      </div>

      {/* Skills Offered */}

      <div>

        <label className="mb-2 block font-medium">
          Skills Offered
        </label>

        <SkillInput
skills={skillsOffered}
setSkills={setSkillsOffered}
/>

      </div>

      {/* Skills Wanted */}

      <div>

        <label className="mb-2 block font-medium">
          Skills Wanted
        </label>

       <SkillInput
skills={skillsWanted}
setSkills={setSkillsWanted}
/>

      </div>

      <Button
        type="submit"
        disabled={isLoading}
      >
        {isLoading
          ? "Saving..."
          : "Save Changes"}
      </Button>

    </form>
  );
}