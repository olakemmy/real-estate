import React, { FC, ReactNode, useEffect, useState } from "react";
import HeaderFilter from "@/components/HeaderFilter";
import Link from "next/link";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import GallerySlider from "@/components/GallerySlider";
import Badge from "@/shared/Badge";
import Loader from "@/components/Loader";
import { formatRelativeDate } from "@/utils/formattedDate";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/features/properties/propertiesApi";


export interface SectionGridFeaturePropertyProps {
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  properties: PropertyType[];
  loading: boolean;
}

type Feature = {
  name: string;
  icon: string;
};

interface PropertyType {
  listingType: string;
  priceForRent: number | null;
  priceForBuy: null;
  address: string;
  detailedAddress: { street: string; city: string; state: string };
  title: string;
  amenities: Feature[];
  propertyImage: string;
  propertyImageList: string[];
  favourite: boolean;
  propertyAttributes: {
    numberOfBedrooms: null;
    numberOfBathrooms: null;
    yearBuilt: string;
    size: string;
    propertyType: string;
    numberOfGarages: null;
  };
  floorPlan: {
    numberOfFloors: null;
    roomSize: string;
    bathroomSize: string;
  };
  description: string;
  property?: any
}
const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  gridClass = "",
  properties,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState("Lagos");
  const dispatch = useAppDispatch();
  const { userInfo } = useSelector((state: any) => state.user);
  const [tabActiveState, setTabActiveState] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    console.log({ activeTab });
  }, [activeTab, dispatch]);

  const handleClickTab = (item: string) => {
    // onClickTab(item);
    setTabActiveState(item);
  };


  useEffect(() => {
    const newFilteredProperties = properties.filter(
      (property: { address: string | string[] }) =>
        property?.address?.includes(tabActiveState)
    );
    setFilteredProperties(newFilteredProperties);

    console.log(filteredProperties);
  }, [tabActiveState, properties]);

  if (loading)
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="nc-SectionGridFeatureProperty relative">
      <HeaderFilter
        tabActive={activeTab}
        tabs={["Lagos", "Abuja", "Port-Harcourt", "Enugu"]}
        heading="Featured properties"
        setTabActiveState={setTabActiveState}
        tabActiveState={tabActiveState}
      />
      <div
        className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}
      >
        {filteredProperties.map((property: any, index: any) => {

          return (
            <div
              key={index}
              className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden  `}
            >

              <Link
                href={`/${property?.listingType?.toLowerCase()}/listingdetails/${property?.id
                  }`}
                className="absolute inset-0"
              ></Link>
              <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
                <div className="flex-shrink-0 p-3 w-full sm:w-64 ">

                  <GallerySlider
                    ratioClass="aspect-w-1 aspect-h-1"
                    galleryImgs={property?.propertyImageList}
                    className="w-full h-full rounded-2xl overflow-hidden"
                    uniqueID={`PropertyCardH_${property?.id}`}
                    href={`/${property?.listingType?.toLowerCase()}/listingdetails/${property?.id
                      }`}
                  />

                </div>
                <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
                  <div className="space-y-4 w-full">
                    <div className="inline-flex space-x-3">
                      <Badge
                        color={
                          property?.listingType === "RENT" ? "blue" : "#14b8a6"
                        }
                        name={
                          <div className="flex items-center">
                            <i className="text-sm las la-share-alt"></i>
                            <span className="ml-1">{property?.listingType}</span>
                          </div>
                        }
                      />
                    </div>
                    <div className="flex flex-col items-start ">
                      <h2 className="text-lg font-medium capitalize">
                        <span className="line-clamp-2">{property?.title}</span>
                      </h2>
                      <h4 className="text-secondary-500 text-sm">
                        {property?.address}
                      </h4>
                    </div>
                    <div className="inline-grid grid-cols-3 gap-2">
                      <div className="flex items-center space-x-2">
                        <span className=" sm:inline-block">
                          <i className="las la-bed text-lg"></i>
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {property?.propertyAttributes?.numberOfBedrooms}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className=" sm:inline-block">
                          <i className="las la-bath text-lg"></i>
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {property?.propertyAttributes?.numberOfBathrooms}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="sm:inline-block">
                          <i className="las la-expand-arrows-alt text-lg"></i>
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {property?.propertyAttributes?.size}
                        </span>
                      </div>
                    </div>
                    <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
                    <div className="flex w-full justify-between  items-center">
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        Listed {formatRelativeDate(property?.createdAt)}
                      </div>
                      <span className="flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none text-sm font-medium text-secondary-500">
                        {property?.listingType === "RENT"
                          ? ` ₦${property?.priceForRent?.toLocaleString(
                            "en-US"
                          )}`
                          : ` ₦${property?.priceForBuy?.toLocaleString(
                            "en-US"
                          )}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <BtnLikeIcon
                wishlist={userInfo?.user?.wishlist || []}
                property={property}
                colorClass={` bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-6000 dark:text-neutral-400`}
                className="absolute right-5 top-5 sm:right-3 sm:top-3 "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionGridFeatureProperty;
