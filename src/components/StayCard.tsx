import React, { FC } from "react";
import Link from "next/link";
import GallerySlider from "./GallerySlider";
import { formData } from "@/interfaces/property";

export interface StayCardProps {
  className?: string;
  size?: "default" | "small";
  formData?: formData;

}


const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  formData,
}) => {



  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${formData?.listingType}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={formData?.propertyImageList ?? []}
          galleryClass={size === "default" ? undefined : ""}
        />

      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-1"}>
        <div className={size === "default" ? "space-y-2" : "space-y-1"}>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {formData?.listingType} ·{" "}
            {formData?.propertyAttributes?.numberOfBedrooms} beds ·{" "}
            {formData?.propertyAttributes?.numberOfBathrooms} Baths ·{" "}
            {formData?.propertyAttributes?.numberOfGarages} Garages
          </span>
          <div className="flex items-center space-x-2">
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === "default" ? "text-base" : "text-base"
                }`}
            >
              <span className="line-clamp-1">{formData?.title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">

            <span className="">{`${formData?.detailedAddress.street}, ${formData?.detailedAddress.city}, ${formData?.detailedAddress.state}`}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {formData?.listingType === "BUY"
              ? formData?.priceForBuy?.toLocaleString("en-US")
              : formData?.priceForRent?.toLocaleString("en-US")}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /year
              </span>
            )}
          </span>

        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 ${size === "default"
        ? "border border-neutral-100 dark:border-neutral-800 "
        : ""
        } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <Link href="">{renderContent()}</Link>
    </div>
  );
};

export default StayCard;
