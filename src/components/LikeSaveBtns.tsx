import {
  setError,
  setLoading,
  setWishlist,
} from "@/features/properties/propertiesSlice";
import { fetchUserProperties, useAppDispatch } from "@/features/user/userApi";
import {
  ADD_WISHLIST,
  DELETE_PROPERTY,
  REMOVE_WISHLIST,
} from "@/graphql/mutation";
import { useMutation } from "@apollo/react-hooks";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ShareModal from "./ShareModal";
import { BsFacebook, BsWhatsapp, BsArrowRight } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FcLink } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEdit } from "react-icons/ai";
import { useSession } from "next-auth/react";
import LoginOrSignUpModal from "./LoginOrSignUpModal";
import client from "@/lib/graphql";
import { GET_USER_PROPERTIES } from "@/graphql/queries";
import { updateUserInfo } from "@/features/user/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "./Loader";
import { fetchProperty } from "@/features/properties/propertiesApi";

export interface BtnLikeIconProps {
  property?: any;
  isLiked?: boolean;
}

const LikeSaveBtns: FC<BtnLikeIconProps> = ({ property }) => {
  const dispatch = useAppDispatch();
  const [addToWishlist] = useMutation(ADD_WISHLIST);
  const [removeFromWishList] = useMutation(REMOVE_WISHLIST);
  const [deleteProperty] = useMutation(DELETE_PROPERTY);
  const { data: session } = useSession();
  const { token } = useSelector((state: any) => state.user);
  const [propertyDeleted, setPropertyDeleted] = useState(false);
  const { userInfo } = useSelector((state: any) => state.user);
  const { property: propertyData } = useSelector(
    (state: any) => state.properties
  );
  const userId = userInfo?.user?.id || userInfo?.id;
  const [showModal, setShowModal] = useState(false);
  const [showModalAuth, setShowModalAuth] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [copyLink, setCopyLink] = useState(false);
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(false);
  const userProperties = userInfo?.user?.properties;

  const wishlist = userInfo?.user?.wishlist;
  // Check if the property is in the user's wishlist
  const isPropertyInWishlist = wishlist.some(
    (item: { id: string }) => item.id === property?.id
  );
  const [isFavourite, setIsFavourite] = useState(isPropertyInWishlist);

  // Use the value for the favourite state
  useEffect(() => {
    const isPropertyInWishlist = wishlist.some(
      (item: { id: string }) => item.id === property?.id
    )
    setIsFavourite(isPropertyInWishlist);
  }, [wishlist]);

  let isOwner = false;
  if ((session || token) && userProperties) {
    isOwner = userProperties.some(
      (userProperty: { id: string }) => userProperty.id === propertyData?.id
    );
  }

  useEffect(() => {
    dispatch(fetchProperty(property.id));
  }, [userId]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}${router.asPath}`);
    }
  }, [router]);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      const optionsContainer = document.querySelector(".options-container");

      // Check if the clicked element is inside the options container
      if (optionsContainer && !optionsContainer.contains(event.target)) {
        setShowOptions(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchUserProperties(userId));
  }, [property, dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProperties(userId));
    }
  }, [dispatch, userId]);

  const handleModalClose = () => {
    setCopyLink(false);
    setShowModal(false);
  };

  const [url, setUrl] = useState("");

  const handleClick = () => {
    router.push(
      `/update-listing/${property.listingType?.toLowerCase()}/?id=${property.id
      }`
    );
  };


  const handleShare = (platform: string) => {
    let shareUrl;

    if (platform === "facebook") {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === "whatsapp") {
      shareUrl = `https://wa.me/?text=${url}`;
    } else if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopyLink(true);

      return;
    }

    window.open(shareUrl, "_blank");
  };

  const handleSaveClick = async () => {
    console.log("save!!!!!");

    if (!session && !token) {
      setShowModalAuth(true);
    } else {
      const { id } = property;

      try {
        console.log("save!!!!!");

        if (isFavourite) {
          const { data } = await removeFromWishList({
            variables: {
              userId,
              propertyId: id,
            },
          });
          dispatch(setWishlist(data.removeFromWishlist));
          setIsFavourite(false); // Update the local state
        } else {
          const { data } = await addToWishlist({
            variables: {
              userId,
              propertyId: id,
            },
          });
          dispatch(setWishlist(data.addToWishlist));
          setIsFavourite(true); // Update the local state
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

  const handleDeleteConfirmed = async () => {
    const { id } = property;
    setLoadingData(true);
    try {
      const { data } = await deleteProperty({
        variables: {
          userId,
          propertyId: id,
        },
      });

      setLoadingData(false);

      console.log("Property deleted. Fetching updated user properties...");

      dispatch(updateUserInfo(data.deleteProperty));

      dispatch(fetchUserProperties(userId));
      console.log("Updated user properties fetched:", userInfo);

      setPropertyDeleted(true);
      // if(propertyDeleted){
      // }
      router.push("/my-listings");
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (propertyDeleted) {
      fetchUserProperties(userId);
    }
  }, [propertyDeleted]);

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="flow-root">
      <div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
        <span
          onClick={() => setShowModal(true)}
          className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          <span className="hidden sm:block ml-2.5">Share</span>
        </span>
        <span
          onClick={handleSaveClick}
          className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill={isFavourite ? "#FF0000" : "none"}
            viewBox="0 0 24 24"
            stroke={isFavourite ? "#FF0000" : "currentColor"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="hidden sm:block ml-2.5">
            {isFavourite ? "Unsave" : "Save"}
          </span>
        </span>

        {(session || token) && isOwner && (
          <span className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className="py-1.5 px-3 flex rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
            >
              <BiDotsHorizontalRounded size={20} />
            </button>

            {showOptions && (
              <div className="origin-top-right absolute right-0 mt-2 w-40 dark:border  rounded-md shadow-lg bg-white ring-1 ring-black dark:ring-[#111827] dark:bg-[#111827] ring-opacity-5 options-container">
                <div
                  className=" space-y-2"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={handleClick}
                    className="w-full flex items-center text-left  px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800"
                    role="menuitem"
                  >
                    <AiOutlineEdit size={20} />
                    <span className="ml-2.5">Update listing</span>
                  </button>

                  <button
                    onClick={handleDeleteConfirmation}
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-800"
                    role="menuitem"
                  >
                    <RxCross2 size={20} />
                    <span className="ml-2.5">Delete listing</span>
                  </button>
                </div>
              </div>
            )}
          </span>
        )}
      </div>

      {showModalAuth && (
        <LoginOrSignUpModal
          onClose={handleAuthModalClose}
          handleClickSave={handleSaveClick}
        />
      )}

      {showModal && (
        <ShareModal onClose={handleModalClose}>
          <div className="flex w-full justify-between items-center mb-4">
            <h2 className="text-[24px] font-bold">
              Share this property with your friends and family
            </h2>
            <button
              className="text-gray-600 border flex items-center justify-center p-3 rounded-lg hover:text-gray-800"
              onClick={handleModalClose}
            >
              <RxCross2 size={27} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              className="flex items-center justify-between border p-5"
              onClick={() => handleShare("facebook")}
            >
              <div className="space-x-3 flex items-center">
                <BsFacebook size={27} color="blue" />
                <span className="text-[18px] font-[400]">Facebook</span>
              </div>

              <BsArrowRight size={27} />
            </button>
            <button
              className="flex items-center border p-5 justify-between"
              onClick={() => handleShare("whatsapp")}
            >
              <div className="space-x-3 flex items-center">
                <BsWhatsapp size={27} color="green" />
                <span className="text-[18px] font-[400]">WhatsApp</span>
              </div>
              <BsArrowRight size={27} />
            </button>
            <button
              className="flex w-full border p-5 space-x-2"
              onClick={() => handleShare("copy")}
            >
              <div className="">
                <FcLink size={27} color="white" />
              </div>
              <div className="flex-grow text-center ">
                <span className="text-[18px] font-[400]">
                  {copyLink ? "Link copied" : "Copy link"}
                </span>
              </div>
            </button>
          </div>
        </ShareModal>
      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg">
            <p className="text-lg dark:text-white font-semibold mb-4">
              Are you sure you want to delete this listing?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleDeleteCancel}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-500 w-[90px] flex justify-center items-center text-white rounded-lg"
              >
                {loadingData ? <Loader color={true} /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeSaveBtns;
