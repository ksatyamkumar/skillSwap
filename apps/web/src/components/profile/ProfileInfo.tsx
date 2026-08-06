import type { UserProfile } from "../../features/profile";

interface Props {
  profile: UserProfile;
}

export default function ProfileInfo({
  profile,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-4 text-xl font-semibold">
        About
      </h2>

      <p className="mb-6 text-gray-700">
        {profile.bio || "No bio added yet."}
      </p>

      <div className="space-y-3">

        <div>

          <span className="font-semibold">
            Location:
          </span>

          {" "}

          {[profile.city, profile.country]
            .filter(Boolean)
            .join(", ") || "-"}

        </div>

        <div>

          <span className="font-semibold">
            Experience:
          </span>

          {" "}

          {profile.experienceYears} Years

        </div>

        <div>

          <span className="font-semibold">
            Availability:
          </span>

          {" "}

          {profile.availability}

        </div>

      </div>

    </div>
  );
}