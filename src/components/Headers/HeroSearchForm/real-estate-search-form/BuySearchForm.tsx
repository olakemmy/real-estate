import React, { useState, useRef, useEffect, FC, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { HomeIcon } from "@heroicons/react/24/outline";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import { ClassOfProperties, StaySearchFormFields } from "../../type";
import convertNumbThousand from "@/utils/convertNumbThousand";
import ButtonSubmit from "../ButtonSubmit";
import { useRouter } from "next/navigation";
import { setSearchQuery } from "@/features/properties/buyListingsSlice";
import PropertyTypeCheckbox from "@/components/PropertyTypeCheckbox";

const defaultPropertyType: ClassOfProperties[] = [
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
    name: "Apartment",
    checked: false,
  },
  {
    name: "Bungalow",
    checked: false,
  },
  {
    name: "Commercial Properties",

    checked: false,
  },
];

export interface RealEstateSearchFormProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  onChange?: (data: any) => void;
  fieldClassName?: string;
  setShowHeroSearch: React.Dispatch<
    React.SetStateAction<StaySearchFormFields | null | undefined>
  >;
}

type Suggestion = {
  place_name: string;
};

const BuySearchForm: FC<RealEstateSearchFormProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Enter a location",
  className = "",
  divHideVerticalLineClass = "left-10 -right-0.5",
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
  setShowHeroSearch,
}) => {
  // Listing Location
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState("");
  const [rangePrices, setRangePrices] = useState([0, 100000000]);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [propertyTypesValue, setPropertyTypesValue] = useState<string[]>([]);
  const route = useRouter();
  const [showDiv, setShowDiv] = useState(true);
  const { userInfo } = useSelector((state: any) => state.user);
  const userId = userInfo?.user?.id || userInfo?.id;



  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  // Listing  Property Type
  const [typeOfProperty, setTypeOfProperty] =
    React.useState<ClassOfProperties[]>(defaultPropertyType);

  let typeOfPropertyText = "";
  if (typeOfProperty && typeOfProperty.length > 0) {
    typeOfPropertyText = typeOfProperty
      .filter((item) => item.checked)
      .map((item) => {
        return item.name;
      })
      .join(", ");
  }

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
    setRangePrices([0, 100000000]);
    setShowPopover(false);
    route.push("/search/buy");
    setShowHeroSearch(null);

  };
  console.log({ showDiv });


  const renderForm = () => {
    return (
      <form className="w-full relative flex flex-col lg:flex-row lg:items-center rounded-3xl lg:rounded-full border dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0">
        <div className={`relative  flex flex-[1.5]`} ref={containerRef}>
          <div
            onClick={() => setShowPopover(true)}
            className={`flex z-10 flex-1 relative h-full [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${showPopover ? "nc-hero-field-focused" : ""
              }`}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>

            <AutoCompleteInput
              address={address}
              setAddress={setAddress}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              showPopover={showPopover}
              placeHolder={placeHolder}
              desc={desc}

            />
          </div>

          {showPopover && (
            <div
              className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
            ></div>
          )}
        </div>
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <Popover className="flex relative flex-1">
          {({ open, close }) => (
            <>
              <Popover.Button
                className={`flex z-10 text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${open ? "nc-hero-field-focused" : ""
                  }`}
                onClickCapture={() => document.querySelector("html")?.click()}
              >
                <div className="text-neutral-300 dark:text-neutral-400">
                  <HomeIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                </div>
                <div className="flex-1">
                  <span className="block w-[70px] xl:text-lg font-semibold overflow-hidden">
                    <span className="line-clamp-1">
                      {!open && `${propertyTypesValue}  Type`}
                      {open && `${propertyTypesValue}  Type`}
                    </span>
                  </span>
                  <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                    Property type
                  </span>
                </div>
              </Popover.Button>

              {open && (
                <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
              )}

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
                  <div className="">
                    <div className="relative flex flex-col space-y-5">
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
                          typeOfProperty.find(
                            (item) => item.name === "Maisonette"
                          )?.checked || false
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
                          typeOfProperty.find(
                            (item) => item.name === "Office Space"
                          )?.checked || false
                        }
                      />
                      <PropertyTypeCheckbox
                        name="Apartment"
                        onChange={handlePropertyTypeChange}
                        isChecked={
                          typeOfProperty.find(
                            (item) => item.name === "Apartment"
                          )?.checked || false
                        }
                      />
                      <PropertyTypeCheckbox
                        name="Bungalow"
                        onChange={handlePropertyTypeChange}
                        isChecked={
                          typeOfProperty.find(
                            (item) => item.name === "Bungalow"
                          )?.checked || false
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
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

        <Popover className="flex relative flex-[1.3]">
          {({ open, close }) => (
            <>
              <div
                className={`flex-1 z-10 flex items-center focus:outline-none cursor-pointer ${open ? "nc-hero-field-focused" : ""
                  }`}
              >
                <Popover.Button
                  className={`flex-1 flex text-left items-center focus:outline-none ${fieldClassName} space-x-3 `}
                  onClickCapture={() => document.querySelector("html")?.click()}
                >
                  <div className="text-neutral-300 dark:text-neutral-400">
                    <div className="w-5 h-5 text-xs lg:w-6 lg:h-6 border-solid rounded-full flex items-center justify-center border-2">
                      ₦
                    </div>
                  </div>
                  <div className="flex-grow">
                    <span className="block xl:text-lg font-semibold truncate">
                      {`₦${rangePrices[0] >= 1000000
                        ? `${(rangePrices[0] / 1000000).toFixed(0)}m`
                        : `${(rangePrices[0] / 1000).toFixed(0)}k`
                        } ~ ₦${rangePrices[1] >= 1000000
                          ? `${(rangePrices[1] / 1000000).toFixed(0)}m`
                          : `${(rangePrices[1] / 1000).toFixed(0)}k`
                        }`}
                    </span>
                    <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                      Enter a price range
                    </span>
                  </div>
                </Popover.Button>

                <div className="pr-2 xl:pr-4">
                  <ButtonSubmit onClick={handleSearch} address={address} />
                </div>
              </div>

              {open && (
                <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
              )}



              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-0 lg:right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
                  <div className="relative flex flex-col space-y-8">

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
                            <span className="text-neutral-500 sm:text-sm">
                              ₦
                            </span>
                          </div>
                          <input
                            type="text"
                            name="minPrice"
                            max={100000000}
                            id="minPrice"
                            className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 dark:border-neutral-500 rounded-full text-neutral-900 dark:text-neutral-200 bg-transparent"
                            value={convertNumbThousand(rangePrices[0])} // For display
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
                            <span className="text-neutral-500 sm:text-sm">
                              ₦
                            </span>
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
                              const newValue = Math.min(
                                numericValue,
                                100000000
                              );
                              setRangePrices([rangePrices[0], newValue]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </form>
    );
  };

  return renderForm();
};

export default BuySearchForm;
