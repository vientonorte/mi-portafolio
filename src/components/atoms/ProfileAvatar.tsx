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
    <div className={cn("profile-avatar relative h-full w-full", className)}>
      <img
        src={getPortfolioImages().branding.profilePhoto}
        alt={alt}
        className="profile-avatar__image h-full w-full object-cover object-top"
        onError={() => setHasPhoto(false)}
      />
      <div className="profile-avatar__warmth pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="profile-avatar__vignette pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  );
}