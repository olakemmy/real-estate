import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";

import Link from "next/link";

import { useSelector } from "react-redux";

export interface StayCard2Props {
  className?: string;
  size?: "default" | "small";
  property?: any;
  handleClick?: any;
}


const WishlistCard: FC<StayCard2Props> = ({
  size = "default",
  className = "",
  property,
  handleClick,
}) => {


  const renderSliderGallery = () => {


    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard2_${property?.id}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={property?.propertyImageList}
          imageClass="rounded-lg"
          href={`/${property?.listingType?.toLowerCase()}/listingdetails/${property?.id
            }`}
        />


      </div>
    );
  };

  const renderContent = () => {
    return (
      <Link
        href={`/${property?.listingType?.toLowerCase()}/listingdetails/${property?.id
          }`}
      >
        <div
          className={size === "default" ? "mt-3 space-y-3" : "mt-2 space-y-2"}
        >
          <div className="space-y-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {property?.listingType} ·{" "}
              {property?.propertyAttributes?.numberOfBedrooms} beds
            </span>
            <div className="flex items-center space-x-2">
              <h2
                className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === "default" ? "text-base" : "text-base"
                  }`}
              >
                <span className="line-clamp-1">{property?.title}</span>
              </h2>
            </div>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
              {size === "default" && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
              <span className="">{property?.address}</span>
            </div>
          </div>
          <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold">
              {property?.listingType === "RENT"
                ? ` ₦${property?.priceForRent?.toLocaleString("en-US")}`
                : ` ₦${property?.priceForBuy?.toLocaleString("en-US")}`}

            </span>

          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className={`nc-StayCard2 group relative ${className}`}>
      {renderSliderGallery()}
      <Link href={`/${property?.listingType?.toLowerCase()}/listingdetails/${property?.id
        }`}>{renderContent()}</Link>
    </div>
  );
};

export default WishlistCard;