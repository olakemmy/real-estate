import React, { FC, useState, useEffect, useRef } from "react";
import StayCard2 from "@/components/StayCard2";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedListing } from "@/features/properties/propertiesSlice";
import Checkbox from "@/shared/Checkbox";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { useRouter } from "next/router";
export interface SectionGridFilterCardProps {
  className?: string;
  properties: any;
  loading?: Boolean;
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

const SectionGridDesktopFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
  properties,
  loading,
}) => {
  const dispatch = useDispatch();

  function handleClick(listingId: String) {
    dispatch(setSelectedListing(listingId));
  }
  console.log("change");

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filteredData, setFilteredData] = useState(properties);
  const [loadingFilters, setLoadingFilters] = useState(false);
  const [checkedTypes, setCheckedTypes] = useState<string[]>([]);
  const [isCleared, setIsCleared] = useState(false);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(10);
  const [rangePrices, setRangePrices] = useState([0, 100000000]);

  console.log({ filteredProperties, filteredData });
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const router = useRouter();

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

  useEffect(() => {
    setLoadingFilters(true);
    let newFilteredProperties = properties;

    if (checkedTypes.length > 0) {
      newFilteredProperties = newFilteredProperties.filter((property: any) =>
        checkedTypes.includes(property.propertyAttributes.propertyType)
      );
    }

    newFilteredProperties = newFilteredProperties.filter((property: any) => {
      if (property.listingType === "RENT") {
        return (
          property.priceForRent &&
          property.priceForRent >= rangePrices[0] &&
          property.priceForRent <= rangePrices[1]
        );
      } else if (property.listingType === "BUY") {
        return (
          property.priceForBuy &&
          property.priceForBuy >= rangePrices[0] &&
          property.priceForBuy <= rangePrices[1]
        );
      }
      return false;
    });

    newFilteredProperties = newFilteredProperties.filter(
      (property: any) =>
        property.propertyAttributes.numberOfBedrooms >= minValue &&
        property.propertyAttributes.numberOfBedrooms <= maxValue
    );
    console.log({ newFilteredProperties });

    setFilteredProperties(newFilteredProperties);
  }, [checkedTypes, rangePrices, minValue, maxValue]);
  console.log({ filteredData });

  // const handleFilter = (newFilteredProperties: any) => {
  //   setFilteredProperties(newFilteredProperties);
  // };

  const renderMoreFilterItem = () => {
    return (
      <div className="">
        <div className="flex flex-col space-y-5">
          {typesProperty.map((item) => (
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
      </div>
    );
  };

  return (
    <div
      className={`nc-SectionGridFilterCard  ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <div className="flex gap-10 mt-">
        <div className="w-3/12">
          <div className="py-7">
            <h3 className="text-xl font-medium">Property type</h3>
            <div className="mt-3 relative ">{renderMoreFilterItem()}</div>
          </div>

          <div className="py-7 ">
            <h3 className="text-xl font-medium">Price range</h3>
            <div className="mt-6 relative ">
              <div className="relative flex flex-col space-y-8">
                <div className="space-y-5"></div>

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
                        <span className="text-neutral-500 sm:text-sm">₦</span>
                      </div>
                      <input
                        type="text"
                        name="minPrice"
                        id="minPrice"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-500 rounded-full text-neutral-900 dark:text-neutral-200 bg-transparent"
                        value={convertNumbThousand(rangePrices[0])}
                        onChange={(e) =>
                          setRangePrices([
                            Number(e.target.value.replace(/[^0-9]/g, "")),
                            rangePrices[1],
                          ])
                        }
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
                        type="text"
                        name="maxPrice"
                        id="maxPrice"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-500 rounded-full text-neutral-900 dark:text-neutral-200 bg-transparent"
                        value={convertNumbThousand(rangePrices[1])}
                        onChange={(e) => {
                          const numericValue = Number(
                            e.target.value.replace(/[^0-9]/g, "")
                          );
                          const newValue = Math.min(numericValue, 100000000);
                          setRangePrices([rangePrices[0], newValue]);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>Number of bedrooms</p>
          <div className="flex space-x-4">
            <div className="w-full">
              <select
                id="min"
                value={minValue}
                onChange={(e) => setMinValue(Number(e.target.value))}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <label
                htmlFor="min"
                className="block text-[12px] mt-1 font-medium text-gray-700"
              >
                Min
              </label>
            </div>

            <div className="w-full">
              <select
                id="max"
                value={maxValue}
                onChange={(e) => setMaxValue(Number(e.target.value))}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
              <label
                htmlFor="max"
                className="block mt-1 text-[12px] font-medium text-gray-700"
              >
                Max
              </label>
            </div>
          </div>
        </div>
        <div className="w-3/4">
          <h1 className="py-8 mt-2 text-[32px] font-bold">Search results</h1>
          {filteredProperties && filteredProperties.length === 0 && (
            <div className="text-lg h-[80vh]">
              {" "}
              No properties match your search
            </div>
          )}
          <div className="grid md:mt-10 grid-cols-1 gap-6 md:gap-8 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
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
    </div>
  );
};

export default SectionGridDesktopFilterCard;
