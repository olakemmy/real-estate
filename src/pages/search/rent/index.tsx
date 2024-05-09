import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SectionGridFilterCard from "@/components/stay-listings/SectionGridFilterCard";
import SectionGridDesktopFilterCard from "@/components/stay-listings/SectionGridDesktopFilterCard";
import {
  fetchRentProperties,
  useAppDispatch,
} from "@/features/properties/propertiesApi";

const RentListingSearch = () => {
  const dispatch = useAppDispatch();
  const { listings: rentListings, loading } = useSelector(
    (state: any) => state.rentListings
  );

  const searchQueryRent = useSelector(
    (state: any) => state.rentListings.searchQuery
  );
  const searchActiveTab = useSelector(
    (state: any) => state.properties.searchActiveTab
  );

  useEffect(() => {
    if (searchQueryRent.address) {
      dispatch(fetchRentProperties("RENT"));
    }
  }, [dispatch, searchQueryRent.address]);

  useEffect(() => {
    console.log("searchActiveTab", searchActiveTab);
  }, [searchActiveTab]);

  const filteredRentProperties = rentListings.filter(
    (property: {
      [x: string]: any;
      title: String;
      priceForRent: any;
      price: any;
      propertyType(propertyType: any): unknown;
      address: String;
    }) => {
      if (
        searchQueryRent.address &&
        !property?.address?.includes(searchQueryRent.address)
      ) {
        return false;
      }

      if (
        searchQueryRent.priceMin &&
        property.priceForRent < searchQueryRent.priceMin
      ) {
        return false;
      }

      if (
        searchQueryRent.priceMax &&
        property.priceForRent > searchQueryRent.priceMax
      ) {
        return false;
      }

      if (
        searchQueryRent.propertyTypesValue.length > 0 &&
        property.propertyAttributes &&
        property.propertyAttributes.propertyType &&
        !searchQueryRent.propertyTypesValue.includes(
          property.propertyAttributes.propertyType
        )
      ) {
        return false;
      }

      return true;
    }
  );

  console.log({ rentListings });

  return (
    <div className=" ">
      <div>
        {searchQueryRent.address && (
          <>
            <SectionGridFilterCard
              properties={filteredRentProperties}
              className="container pb-24 lg:pb-28 block lg:hidden"
            />

            <SectionGridDesktopFilterCard
              properties={filteredRentProperties}
              className="container pb-24 lg:pb-28 hidden lg:block"
              loading={loading}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RentListingSearch;
