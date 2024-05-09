import React, { useState } from "react";

import { useSelector } from "react-redux";
import {
  fetchProperty,
  useAppDispatch,
} from "@/features/properties/propertiesApi";
import { getWhatsAppUrl } from "@/utils/whatsapp";
import { IoLogoWhatsapp } from "react-icons/io";

const MobileFooterSticky = () => {
  const dispatch = useAppDispatch();

  const createdListing = useSelector((state: any) => state.properties.property);
  console.log("createdListing", createdListing);

  const handleWhatsAppClick = () => {
    const phone = "+447735750274";
    const message = "Welcome to Ogle";
    const whatsappUrl = getWhatsAppUrl(phone, message);
    window.open(whatsappUrl, "_blank", "noreferrer");
  };

  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/02/06")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-xl font-semibold">
            {createdListing?.listingType === "RENT"
              ? ` ₦${createdListing?.priceForRent?.toLocaleString("en-US")}`
              : ` ₦${createdListing?.priceForBuy?.toLocaleString("en-US")}`}

            {createdListing?.listingType === "RENT" && (
              <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
                /year
              </span>
            )}
          </span>
          {createdListing?.listingType === "RENT" ? "availability:" : null}


        </div>
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="bg-[#24d366] flex items-center justify-center rounded-full px-4 py-4"
        >
          <IoLogoWhatsapp color="#ffffff" size={23} />
        </button>

      </div>
    </div>
  );
};

export default MobileFooterSticky;
