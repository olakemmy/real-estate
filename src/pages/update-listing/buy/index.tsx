import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_LISTING } from "@/graphql/mutation";
import {
  setProperty,
  setLoading,
  setError,
} from "@/features/properties/propertiesSlice";
import { formData } from "@/interfaces/property";
import PropertTypeForm from "@/components/update-listing/buy/PropertyTypeForm";
import LocationForm from "@/components/update-listing/buy/LocationForm";
import FloorPlan from "@/components/update-listing/buy/FloorPlan";
import Price from "@/components/update-listing/buy/Price";
import PropertyAttributes from "@/components/update-listing/buy/PropertyAttribtue";
import Amenities from "@/components/update-listing/buy/Amenities";
import Description from "@/components/update-listing/buy/Description";
import PropertyPicture from "@/components/update-listing/buy/PropertyPicture";
import PrivateRoute from "@/hooks/PrivateRoute";
import {
  fetchProperty,
  useAppDispatch,
} from "@/features/properties/propertiesApi";
import { useRouter } from "next/router";

const BuyForm = () => {
  const dispatch = useAppDispatch();
  const [updateListing] = useMutation(UPDATE_LISTING);
  const { userInfo } = useSelector((state: any) => state.user);
  const { property } = useSelector((state: any) => state.properties);

  const userId = userInfo?.user?.id || userInfo?.id;
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const id = router.query.id as string;
  console.log(id);

  useEffect(() => {
    if (id) {
      dispatch(fetchProperty(id));
    }
  }, [id, dispatch]);

  const [formData, setFormData] = useState<formData>(property);
  console.log(property);

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
        propertyImage,
        propertyImageList,
      } = property;
      dispatch(setLoading(true));
      const { data } = await updateListing({
        variables: {
          id,
          listingType,
          bathroomSize,
          address,
          title,
          numberOfBedrooms,
          propertyType,
          propertyImage,
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
      dispatch(setProperty(data.updateListing));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

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
            onNextPage={handleNextPage}
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
          <span className="text-4xl font-semibold">{currentPage}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 9
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
