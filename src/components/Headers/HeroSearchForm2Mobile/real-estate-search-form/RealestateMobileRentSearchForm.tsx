import React, { useEffect, useState } from "react";
import convertNumbThousand from "@/utils/convertNumbThousand";

import { ClassOfProperties } from "../../type";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import { MapPinIcon } from "@heroicons/react/24/solid";
import PropertyTypeCheckbox from "@/components/PropertyTypeCheckbox";
import { useTimeoutFn } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setSearchQuery } from "@/features/properties/rentListingsSlice";
import ButtonSubmit from "../../HeroSearchForm/ButtonSubmit";

import axios from "axios";

type Suggestion = {
  place_name: string;
};

const RealestateMobileRentSearchForm = ({ closeModal }: any) => {
  const [address, setAddress] = useState("");

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showPopover, setShowPopover] = useState(false);
  const [propertyTypesValue, setPropertyTypesValue] = useState<string[]>([]);
  const [rangePrices, setRangePrices] = useState([0, 100000000]);
  const [showModal, setShowModal] = useState(false);
  const [showDiv, setShowDiv] = useState(true);

  const { userInfo } = useSelector((state: any) => state.user);
  const userId = userInfo?.user?.id || userInfo?.id;
  const route = useRouter();
  const dispatch = useDispatch();


  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  const [showDialog, setShowDialog] = useState(false);
  let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
  //

  const [fieldNameShow, setFieldNameShow] = useState<
    "location" | "propertyType" | "price"
  >("location");

  const [typeOfProperty, setTypeOfProperty] = useState<ClassOfProperties[]>([
    {
      name: "Duplex",
      checked: false,
    },
    {
      name: "Maisonette",
      checked: false,
    },
    {
      name: "Shop",
      checked: false,
    },
    {
      name: "Office Space",
      checked: false,
    },
    {
      name: " Apartment",
      checked: false,
    },
    {
      name: " Bungalow",
      checked: false,
    },
    {
      name: "Commercial Properties",
      checked: false,
    },
  ]);

  console.log({ address });
  console.log({ propertyTypesValue });
  console.log({ rangePrices });

  // listing property type
  const handlePropertyTypeChange = (name: string, isChecked: boolean) => {
    const updatedTypeOfProperty = typeOfProperty.map((item) => {
      if (item.name === name) {
        return { ...item, checked: isChecked };
      }
      return item;
    });
    setTypeOfProperty(updatedTypeOfProperty);

    const newPropertyTypes = isChecked
      ? [...propertyTypesValue, name]
      : propertyTypesValue.filter((propertyType) => propertyType !== name);
    setPropertyTypesValue(newPropertyTypes);
  };
  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();



    const searchQuery = {
      address,
      priceMin: rangePrices[0],
      priceMax: rangePrices[1],
      propertyTypesValue,
    };


    dispatch(setSearchQuery(searchQuery));
    setPropertyTypesValue([]);
    setAddress("");
    setRangePrices([0, 4000000]);
    setShowPopover(false);
    closeModal();
    route.push("/search/rent");
  };



  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <>
        <div
          className={`w-full relative px-4 py-1 bg-white dark:bg-neutral-800 ${isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
            }`}
        >
          <div className="flex">
            <div className="text-neutral-300 pr-2 dark:text-neutral-400 hidden mb:block">
              <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <AutoCompleteInput
              address={address}
              setAddress={setAddress}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              showPopover={showPopover}
              placeHolder="Enter a location"
              desc=""

            />
          </div>
        </div>
      </>
    );
  };

  const renderInputPropertyType = () => {
    const isActive = fieldNameShow === "propertyType";

    let typeOfPropertyText = "";
    if (typeOfProperty && typeOfProperty.length > 0) {
      typeOfPropertyText = typeOfProperty
        .filter((item) => item.checked)
        .map((item) => {
          return item.name;
        })
        .join(", ");
    }

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive
          ? "rounded-2xl shadow-lg"
          : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
          }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("propertyType")}
          >
            <span className="text-neutral-400">Property</span>
            <span className="truncate ml-5">
              {typeOfPropertyText || "Add property"}
            </span>
          </button>
        ) : (
          <>
            <div className="relative flex flex-col p-5 space-y-5">
              <span className="block font-semibold text-xl sm:text-2xl">
                Property types
              </span>
              <PropertyTypeCheckbox
                name="Duplex"
                onChange={handlePropertyTypeChange}
                isChecked={
                  typeOfProperty.find((item) => item.name === "Duplex")
                    ?.checked || false
                }
              />
              <PropertyTypeCheckbox
                name="Maisonette"
                onChange={handlePropertyTypeChange}
                isChecked={
                  typeOfProperty.find((item) => item.name === "Maisonette")
                    ?.checked || false
                }
              />{" "}
              <PropertyTypeCheckbox
                name="Shop"
                onChange={handlePropertyTypeChange}
                isChecked={
                  typeOfProperty.find((item) => item.name === "Shop")
                    ?.checked || false
                }
              />{" "}
              <PropertyTypeCheckbox
                name="Office Space"
                onChange={handlePropertyTypeChange}
                isChecked={
                  typeOfProperty.find((item) => item.name === "Office Space")
                    ?.checked || false
                }
              />
              <PropertyTypeCheckbox
                name="Apartment"
                onChange={handlePropertyTypeChange}
                isChecked={
                  typeOfProperty.find((item) => item.name === "Apartment")
                    ?.checked || false
                }
              />
              <PropertyTypeCheckbox
                name="Bungalow"
                onChange={handlePropertyTypeChange}
                isChecked={
                  typeOfProperty.find((item) => item.name === "Bungalow")
                    ?.checked || false
                }
              />
              <PropertyTypeCheckbox
                name="Commercial Properties"
                onChange={handlePropertyTypeChange}
                isChecked={
                  typeOfProperty.find(
                    (item) => item.name === "Commercial Properties"
                  )?.checked || false
                }
              />
            </div>
          </>
        )}
      </div>
    );
  };

  const renderInputPrice = () => {
    const isActive = fieldNameShow === "price";

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${isActive
          ? "rounded-2xl shadow-lg"
          : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
          }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("price")}
          >
            <span className="text-neutral-400">Price</span>
            <span>
              {`₦${convertNumbThousand(
                rangePrices[0] / 1000
              )}k ~ ₦${convertNumbThousand(rangePrices[1] / 1000)}k`}
            </span>
          </button>
        ) : (
          <div className="p-5">
            <span className="block font-semibold text-xl sm:text-2xl">
              Enter a price range
            </span>
            <div className="relative flex flex-col space-y-8 mt-7">


              <div className="flex justify-between space-x-3">
                <div>
                  <label
                    htmlFor="minPrice"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Min price
                  </label>
                  <div className="mt-1 relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-neutral-500 sm:text-sm">₦</span>
                    </div>
                    <input
                      type="text"
                      disabled
                      name="minPrice"
                      id="minPrice"
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                      value={convertNumbThousand(rangePrices[0])}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="maxPrice"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Max price
                  </label>
                  <div className="mt-1 relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-neutral-500 sm:text-sm">₦</span>
                    </div>
                    <input
                      disabled
                      type="text"
                      name="maxPrice"
                      id="maxPrice"
                      className="focus:ring-primary-500 focus:border-priring-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                      value={convertNumbThousand(rangePrices[1])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full space-y-5 flex flex-col ">
        {/*  */}
        {renderInputLocation()}
        {/*  */}
        {renderInputPropertyType()}
        {/*  */}
        {renderInputPrice()}

        <div className="px-4 py-3 absolute bottom-2 w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
          <button
            type="button"
            className="underline font-semibold flex-shrink-0"
            onClick={() => {
              setShowDialog(false);
              resetIsShowingDialog();
            }}
          >
            Clear all
          </button>
          <ButtonSubmit onClick={handleSearch} address={address} href="/" />{" "}
        </div>
      </div>
    </div>
  );
};

export default RealestateMobileRentSearchForm;
