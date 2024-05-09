import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADD_WISHLIST, REMOVE_WISHLIST } from "@/graphql/mutation";
import { useMutation } from "@apollo/client";
import {
  setError,
  setIsLiked,
  setLoading,
  setWishlist,
} from "@/features/properties/propertiesSlice";
import { fetchUserProperties, useAppDispatch } from "@/features/user/userApi";
import { useSession } from "next-auth/react";
import LoginOrSignUpModal from "./LoginOrSignUpModal";
import { fetchProperty } from "@/features/properties/propertiesApi";

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  property?: any;
  wishlist?: Array<{ id: string }>; // Add this prop
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  property,
  wishlist,
}) => {
  const dispatch = useAppDispatch();
  const [addToWishlist] = useMutation(ADD_WISHLIST);
  const [removeFromWishList] = useMutation(REMOVE_WISHLIST);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = userInfo?.user?.id || userInfo?.id;
  const [showModalAuth, setShowModalAuth] = useState(false);
  const { data: session } = useSession();
  const { token } = useSelector((state: any) => state.user);

  // Check if the property is in the user's wishlist
  const isPropertyInWishlist = wishlist
    ? wishlist.some((item: { id: string }) => item.id === property?.id)
    : false;

  // Use the value for the favourite state
  const [isFavourite, setIsFavourite] = useState(isPropertyInWishlist);

  useEffect(() => {
    const isPropertyInWishlist = wishlist
      ? wishlist.some((item: { id: string }) => item.id === property?.id)
      : false;
    setIsFavourite(isPropertyInWishlist);
  }, [wishlist]);
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProperties(userId));
    }
  }, [dispatch, userId]);

  const handleSaveClick = async () => {
    if (!session && !token) {
      setShowModalAuth(true);
    } else {
      const { id } = property;

      try {
        if (isFavourite) {
          const { data } = await removeFromWishList({
            variables: {
              userId,
              propertyId: id,
            },
          });
          dispatch(setWishlist(data.removeFromWishlist));
          setIsFavourite(false);
        } else {
          const { data } = await addToWishlist({
            variables: {
              userId,
              propertyId: id,
            },
          });
          dispatch(setWishlist(data.addToWishlist));
          setIsFavourite(true);
        }
        dispatch(fetchProperty(property?.id));
      } catch (error) {
        dispatch(setLoading(false));
        dispatch(setError(error));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleAuthModalClose = () => {
    setShowModalAuth(false);
    if (session || token) {
      handleSaveClick();
    }
  };

  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
        isFavourite ? "nc-BtnLikeIcon--liked" : ""
      }  ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      title={isFavourite ? "Remove from Wishlist" : "Add to Wishlist"}
    >
      <svg
        onClick={handleSaveClick}
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={isFavourite ? "currentColor" : "none"} // Use the local state value to determine the color
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

      {showModalAuth && (
        <LoginOrSignUpModal
          onClose={handleAuthModalClose}
          handleClickSave={handleSaveClick}
        />
      )}
    </div>
  );
};

export default BtnLikeIcon;
