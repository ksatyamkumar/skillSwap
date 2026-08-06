import { useEffect, useRef, useState } from "react";

import { Camera } from "lucide-react";

interface AvatarUploadProps {
  avatar?: string;
  onUpload: (file: File) => Promise<void>;
  isLoading?: boolean;
}

export default function AvatarUpload({
  avatar,
  onUpload,
  isLoading = false,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const displayedAvatar = preview || avatar;

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);

    try {
      await onUpload(file);
    } catch {
      URL.revokeObjectURL(previewUrl);
      setPreview(null);
    }
  };

  return (
    <div className="flex justify-center">
      <div
        className="relative h-32 w-32 cursor-pointer"
        onClick={openFilePicker}
      >
        <img
          src={
            displayedAvatar ||
            "https://placehold.co/200x200?text=User"
          }
          alt="Avatar"
          className="h-32 w-32 rounded-full border object-cover"
        />

        <div className="absolute bottom-1 right-1 rounded-full bg-black p-2 text-white">
          <Camera size={18} />
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white">
            Uploading...
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/png,image/jpeg,image/webp"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}