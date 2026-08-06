import type { UserProfile } from "../../features/profile";

interface ProfileHeaderProps {
  profile: UserProfile;
}

export default function ProfileHeader({
  profile,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-xl border bg-white p-8 shadow-sm">

      <div className="flex flex-col items-center">

        <img
          src={
            profile.avatar ||
            "https://placehold.co/120x120"
          }
          alt={profile.fullName}
          className="mb-4 h-28 w-28 rounded-full border object-cover"
        />

        <h1 className="text-3xl font-bold">
          {profile.fullName}
        </h1>

        <p className="mt-2 text-gray-600">
          ⭐ {profile.rating.toFixed(1)}
          {" "}
          ({profile.reviewCount} Reviews)
        </p>

      </div>

    </div>
  );
}