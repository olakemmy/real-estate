import { avatarColors } from "@/contains/contants";
import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  userName?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
  imgUrl?: string | StaticImageData;
}

const Avatar: FC<AvatarProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  userName,
  hasChecked,
  hasCheckedClass = "w-4 h-4 -top-0.5 -right-0.5",
}) => {
  const { data: session } = useSession();
  const { userInfo } = useSelector((state: any) => state.user);
  const currentUser = userInfo?.user;

  const profileUrl = session?.user?.image || currentUser?.profilePictureUrl;

  const name = userName || "John Doe";

  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(
      name?.charCodeAt(0) % avatarColors.length
    );
    return avatarColors[backgroundIndex];
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{
        backgroundColor: profileUrl
          ? undefined
          : _setBgColor(currentUser?.name),
      }}
    >
      {profileUrl && (
        <Image
          className={`absolute inset-0 w-full h-full object-cover ${radius}`}
          src={profileUrl}
          alt={name}
          fill
        />
      )}
      {!profileUrl && (
        <span
          className="wil-avatar__name"
          style={{ backgroundColor: _setBgColor(currentUser?.name) }}
        >
          {currentUser?.name
            .split(" ")
            .map((word: any[]) => word[0])
            .join("")
            .toUpperCase()}
        </span>
      )}

      {hasChecked && (
        <span
          className={`bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute ${hasCheckedClass}`}
        >
          <i className="las la-check"></i>
        </span>
      )}
    </div>
  );
};

export default Avatar;
