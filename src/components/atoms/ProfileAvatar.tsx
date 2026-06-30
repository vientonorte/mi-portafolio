import { useState } from "react";
import { User } from "lucide-react";
import { cn } from "../../lib/utils";
import { getPortfolioImages } from "../../lib/image-overrides";
import { useImageManifestVersion } from "../../lib/ImageManifestProvider";

interface ProfileAvatarProps {
  className?: string;
  initials?: string;
  alt?: string;
}

export function ProfileAvatar({
  className,
  initials = "RG",
  alt = "Rodrigo Gaete — Lead UX Designer",
}: ProfileAvatarProps) {
  useImageManifestVersion();
  const [hasPhoto, setHasPhoto] = useState(true);

  if (!hasPhoto) {
    return (
      <div
        className={cn(
          "w-full h-full bg-brand-gradient flex items-center justify-center",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <span className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={getPortfolioImages().branding.profilePhoto}
      alt={alt}
      className={cn("w-full h-full object-cover object-top", className)}
      onError={() => setHasPhoto(false)}
    />
  );
}