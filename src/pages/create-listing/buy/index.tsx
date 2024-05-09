import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_LISTING } from "@/graphql/mutation";
import {
  setProperty,
  setLoading,
  setError,
} from "@/features/properties/propertiesSlice";
import { formData } from "@/interfaces/property";
import PropertTypeForm from "@/components/create-listing/buy/PropertyTypeForm";
import LocationForm from "@/components/create-listing/buy/LocationForm";
import FloorPlan from "@/components/create-listing/buy/FloorPlan";
import Price from "@/components/create-listing/buy/Price";
import PropertyAttributes from "@/components/create-listing/buy/PropertyAttribtue";
import Amenities from "@/components/create-listing/buy/Amenities";
import Description from "@/components/create-listing/buy/Description";
import PropertyPicture from "@/components/create-listing/buy/PropertyPicture";
import PrivateRoute from "@/hooks/PrivateRoute";
import { useRouter } from "next/router";

const BuyForm = () => {
  const dispatch = useDispatch();
  const [createListing] = useMutation(CREATE_LISTING);
  const { userInfo } = useSelector((state: any) => state.user);

  const userId = userInfo?.user?.id || userInfo?.id;
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState<formData>({
    listingType: "BUY",
    priceForRent: null,
    priceForBuy: null,
    address: "",
    detailedAddress: {
      street: "",
      city: "",
      state: "",
    },
    title: "",
    amenities: [],
    propertyImageList: [],
    favourite: false,
    propertyAttributes: {
      numberOfBedrooms: 0,
      numberOfBathrooms: 0,
      yearBuilt: "",
      size: "",
      propertyType: "",
      numberOfGarages: 0,
    },
    floorPlan: {
      numberOfFloors: 0,
      roomSize: "",
      bathroomSize: "",
    },
    description: "",
  });

  const handleNextPage = (data: formData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = (data: formData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...data,
    }));
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleSubmit = async (data: formData) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    try {
      const {
        listingType,
        address,
        title,
        amenities,
        detailedAddress: { street, state, city },
        priceForRent,
        priceForBuy,
        favourite,
        propertyAttributes: {
          numberOfBedrooms,
          propertyType,
          numberOfBathrooms,
          numberOfGarages,
          size,
        },
        floorPlan: { numberOfFloors, bathroomSize, roomSize },
        description,
        propertyImageList,
      } = formData;
      dispatch(setLoading(true));
      const { data } = await createListing({
        variables: {
          userId,
          listingType,
          bathroomSize,
          address,
          title,
          numberOfBedrooms,
          propertyType,
          propertyImageList,
          size,
          amenities,
          city,
          state,
          street,
          priceForRent,
          priceForBuy,
          favourite,
          description,
          roomSize,
          numberOfBathrooms,
          numberOfFloors,
          numberOfGarages,
        },
      });
      dispatch(setProperty(data.createListing));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (!shallow) {
        if (
          window.confirm(
            "Navigating away will result in data loss. Please use the page Back button."
          )
        ) {
          // User confirmed, allow navigation
        } else {
          // User denied, cancel navigation
          router.events.emit("routeChangeError");
          throw "Route change aborted.";
        }
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return (
          <PropertTypeForm formData={formData} onNextPage={handleNextPage} />
        );
      case 2:
        return (
          <LocationForm
            formData={formData}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      case 3:
        return (
          <PropertyAttributes
            formData={formData}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      case 4:
        return (
          <FloorPlan
            formData={formData}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      case 5:
        return (
          <Amenities
            formData={formData}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      case 6:
        return (
          <Description
            formData={formData}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      case 7:
        return (
          <PropertyPicture
            formData={formData}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      case 8:
        return (
          <Price
            formData={formData}
            onPreviousPage={handlePreviousPage}
            onSubmit={handleSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <PrivateRoute>
      <div className="nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-10 sm:py-20 lg:pb-32">
        <div className="">
          <span className="text-4xl font-semibold">{currentPage}</span>
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 8
          </span>
        </div>

        <div className="my-8">
          <div className="listingSection__wrap">{renderPage()}</div>
        </div>
        <div className="flex justify-between">
          <div></div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default BuyForm;
