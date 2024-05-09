import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import NcInputNumber from "@/components/NcInputNumber";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonThird from "@/shared/ButtonThird";
import ButtonClose from "@/shared/ButtonClose";
import Checkbox from "@/shared/Checkbox";
import Slider from "rc-slider";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { formData } from "@/interfaces/property";

interface TabFiltersProps {
  properties?: formData[];
  onFilter?: (filteredProperties: formData[]) => void;
}

const typesProperty = [
  { name: "Duplex" },
  { name: "Maisonette" },
  { name: "Shop" },
  { name: "Office Space" },
  { name: "Apartment" },
  { name: "Bungalow" },
  { name: "Commercial Properties" },
];

const TabFilters: React.FC<TabFiltersProps> = ({ properties, onFilter }) => {
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [rangePrices, setRangePrices] = useState([0, 100000000]);
  const [checkedTypes, setCheckedTypes] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [isCleared, setIsCleared] = useState(false);

  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    typeName: string
  ) => {
    if (event.target.checked) {
      setCheckedTypes((prevCheckedTypes) => [...prevCheckedTypes, typeName]);
    } else {
      setCheckedTypes((prevCheckedTypes) =>
        prevCheckedTypes.filter((type) => type !== typeName)
      );
    }
  };

  const renderMoreFilterItem = () => {
    const list1 = typesProperty.filter((_, i) => i < typesProperty.length / 2);
    const list2 = typesProperty.filter((_, i) => i >= typesProperty.length / 2);
    return (
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              checked={checkedTypes.includes(item.name)}
              icon={""}
              onChange={(event) => handleCheckboxChange(event, item.name)}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              icon={""}
              onChange={(event) => handleCheckboxChange(event, item.name)}
              checked={checkedTypes.includes(item.name)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderTabMoreFilter = () => {
    const handleApplyFilters = () => {
      const filteredPropertiesArray =
        filteredProperties?.filter((listing: any) => {
          const property = listing.property;
          if (
            checkedTypes.length > 0 &&
            !checkedTypes.includes(property.propertyAttributes.propertyType)
          ) {
            return false;
          }

          if (
            bedrooms > 0 &&
            property.propertyAttributes.numberOfBedrooms !== bedrooms
          ) {
            return false;
          }

          if (
            bathrooms > 0 &&
            property.propertyAttributes.numberOfBathrooms !== bathrooms
          ) {
            return false;
          }

          const price =
            property.listingType === "RENT"
              ? property.priceForRent
              : property.priceForBuy;

          if (price === null) {
            return false;
          }

          if (price < rangePrices[0] || price > rangePrices[1]) {
            return false;
          }

          return true;
        }) ?? [];

      setFilteredProperties(() => filteredProperties);

      closeModalMoreFilter();

      onFilter?.(filteredPropertiesArray);
    };


    const handleClearFilters = () => {
      setCheckedTypes([]);
      setBedrooms(0);
      setBathrooms(0);
      setRangePrices([0, 100000000]);
      setIsCleared(true); // Set the cleared status to true
    };
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none cursor-pointer`}
          onClick={openModalMoreFilter}
        >
          <span>Filters</span>
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Property type</h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem()}
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Price range</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                className="text-red-400"
                                min={10000}
                                max={100000000}
                                value={
                                  isCleared
                                    ? [0, 100000000]
                                    : [rangePrices[0], rangePrices[1]]
                                }
                                allowCross={false}
                                onChange={(e) => {
                                  setRangePrices(e as number[]);
                                  setIsCleared(false);
                                }}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Min price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      ₦
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
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
                                    <span className="text-neutral-500 sm:text-sm">
                                      ₦
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={convertNumbThousand(rangePrices[1])}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Property attributes
                        </h3>
                        <div className="mt-6 relative flex flex-col space-y-5">
                          <NcInputNumber
                            label="Bedrooms"
                            max={10}
                            value={bedrooms}
                            onChange={setBedrooms}
                          />
                          <NcInputNumber
                            label="Bathrooms"
                            max={10}
                            value={bathrooms}
                            onChange={setBathrooms}
                          />
                        </div>
                      </div>

                      {/* ---- */}
                    </div>
                  </div>

                  <div className="p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={handleClearFilters}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={handleApplyFilters}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className="flex lg:space-x-4">
      <div className="flex space-x-4">{renderTabMoreFilter()}</div>
    </div>
  );
};

export default TabFilters;
