import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADD_WISHLIST, REMOVE_WISHLIST } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import {
  setError,
  setLoading,
  setWishlist,
} from "@/features/properties/propertiesSlice";
import { fetchUserProperties, useAppDispatch } from "@/features/user/userApi";

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  property?: any;
}

const RemoveWishlistBtn: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = true,
  property,
}) => {
  const dispatch = useAppDispatch();
  const [addToWishlist] = useMutation(ADD_WISHLIST);
  const [removeFromWishList] = useMutation(REMOVE_WISHLIST);
  const wishlist = useSelector((state: any) => state.properties.wishlist);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = userInfo?.user?.id || userInfo?.id;
  const [liked, setLiked] = useState(isLiked); // Local state to track "liked" status

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProperties(userId));
    }
  }, [dispatch, userId, liked]);

  const handleLikeClick = async () => {
    const { id } = property;
    try {
      const { data } = await removeFromWishList({
        variables: {
          userId,
          propertyId: id,
        },
      });
      dispatch(setWishlist(data.removeFromWishlist));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
        liked ? "nc-BtnLikeIcon--liked" : ""
      }  ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      title={liked ? "Remove from Wishlist" : "Add to Wishlist"}
      onClick={handleLikeClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={liked ? "currentColor" : "none"} // Use the local state value to determine the color
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default RemoveWishlistBtn;
