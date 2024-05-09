import React, { FC, useState, useEffect } from "react";
import TabFilters from "./TabFilters";
import StayCard2 from "@/components/StayCard2";

import { useDispatch, useSelector } from "react-redux";
import {

  setSelectedListing,
} from "@/features/properties/propertiesSlice";
import Link from "next/link";

export interface SectionGridFilterCardProps {
  className?: string;
  properties: any;
  loading?: Boolean;
}


const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  properties,
  loading,
}) => {
  const dispatch = useDispatch();

  function handleClick(listingId: String) {
    dispatch(setSelectedListing(listingId));
  }

  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  console.log({ filteredProperties });
  const handleFilter = (newFilteredProperties: any) => {
    setFilteredProperties(newFilteredProperties);
  };

  return (
    <div
      className={`nc-SectionGridFilterCard  ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <div>
        <div className="mb-8 mt-10 lg:mb-11 flex justify-between">
          <TabFilters properties={properties} onFilter={handleFilter} />

          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="flex items-center justify-center rounded-full bg-primary-500 text-white px-3 py-2 transition-colors duration-300 hover:bg-primary-7000 focus:bg-primary-7000 focus:outline-none"
            >
              <span className="hidden md:inline-block">Back to home</span>
              <span className="md:hidden inline-block">Back</span>
            </Link>
          </div>
        </div>

        {filteredProperties && filteredProperties.length === 0 && (
          <div className="text-lg h-[80vh]"> No properties match your search</div>
        )}
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties ? (
            <>
              {" "}
              {filteredProperties.map(
                (property: { id: React.Key | null | undefined }) => (
                  <StayCard2
                    key={property?.id}
                    property={property}
                    handleClick={handleClick}
                  />
                )
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;