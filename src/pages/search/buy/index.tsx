import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SectionGridFilterCard from "@/components/stay-listings/SectionGridFilterCard";
import SectionGridDesktopFilterCard from "@/components/stay-listings/SectionGridDesktopFilterCard";
import { clearListings } from "@/features/properties/buyListingsSlice";
import {
  fetchBuyProperties,
  useAppDispatch,
} from "@/features/properties/propertiesApi";

const BuyListingSearch = () => {
  const dispatch = useAppDispatch();

  const { listings, loading } = useSelector((state: any) => state.buyListings);

  const searchQuery = useSelector(
    (state: any) => state.buyListings.searchQuery
  );

  const searchActiveTab = useSelector(
    (state: any) => state.properties.searchActiveTab
  );

  useEffect(() => {
    if (searchQuery.address) {
      dispatch(clearListings());
      dispatch(fetchBuyProperties("BUY"));
    }
  }, [dispatch, searchQuery.address]);

  useEffect(() => {
    console.log("searchActiveTab", searchActiveTab);
  }, [searchActiveTab]);

  const filteredBuyProperties = listings.filter(
    (property: {
      [x: string]: any;
      price: any;
      propertyType(propertyType: any): unknown;
      address: String;
    }) => {
      if (
        searchQuery.address &&
        !property?.address?.includes(searchQuery.address)
      ) {
        return false;
      }
      if (searchQuery.priceMin && property.priceForBuy < searchQuery.priceMin) {
        return false;
      }

      if (searchQuery.priceMax && property.priceForBuy > searchQuery.priceMax) {
        return false;
      }

      if (
        searchQuery.propertyTypesValue.length > 0 &&
        property.propertyAttributes &&
        property.propertyAttributes.propertyType &&
        !searchQuery.propertyTypesValue.includes(
          property.propertyAttributes.propertyType
        )
      ) {
        return false;
      }

      return true;
    }
  );

  return (
    <div>
      {searchQuery.address && (
        <div className="">
          <>
            <SectionGridFilterCard
              properties={filteredBuyProperties}
              className="container pb-24 lg:pb-28 block lg:hidden"
            />

            <SectionGridDesktopFilterCard
              properties={filteredBuyProperties}
              className="container pb-24 lg:pb-28 hidden lg:block"
              loading={loading}
            />
          </>
        </div>
      )}
    </div>
  );
};

export default BuyListingSearch;
