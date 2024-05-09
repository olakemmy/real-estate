import { MapPinIcon } from "@heroicons/react/24/solid";
import Label from "@/components/Label";
import React, { FC, useEffect, useState, useRef } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "./FormItem";

import { useRouter } from "next/navigation";

import { formData } from "@/interfaces/property";
import Error from "@/components/Error";

export interface PageAddListing1Props {
  formData: formData;
  onNextPage: (data: formData) => void;
  onPreviousPage: (data: formData) => void;
}

const LocationForm: FC<PageAddListing1Props> = ({
  formData,
  onNextPage,
  onPreviousPage,
}) => {
  const [detailedAddress, setDetailedAddress] = useState(
    formData.detailedAddress
  );

  const [error, setError] = useState("");

  console.log({ formData });
  console.log("jjvc");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleNext() {
    let errorMessage = "";

    if (!detailedAddress.street) {
      errorMessage += "Please enter a street address. ";
    }
    if (!detailedAddress.city) {
      errorMessage += "Please enter a city. ";
    }
    if (!detailedAddress.state) {
      errorMessage += "Please enter a state. ";
    }

    if (errorMessage) {
      window.scrollTo(0, 0);
      setError(errorMessage);
    } else {
      const newDetailedAddress = {
        city: detailedAddress.city,
        state: detailedAddress.state,
        street: detailedAddress.street,
      };
      const data: formData = {
        ...formData,
        detailedAddress: newDetailedAddress,
      };
      onNextPage(data);
    }
  }

  console.log(detailedAddress);

  const handleCloseError = () => {
    setError("");
  };

  function handlePrevious() {
    const newDetailedAddress = {
      city: detailedAddress.city,
      state: detailedAddress.state,
      street: detailedAddress.street,
    };
    const data: formData = {
      ...formData,
      detailedAddress: newDetailedAddress,
    };
    onPreviousPage(data);
  }

  


  return (
    <div>
      <h2 className="text-2xl font-semibold">Your place location</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-8"></div>
      {error && <Error error={error} onClose={handleCloseError} />}

      {/* FORM */}
      <div className="space-y-8">

        {/* ITEM */}
        <FormItem label="Country/Region">
          <Select>
            <option value="Nigeria">Nigeria</option>
          </Select>
        </FormItem>
        <FormItem label="Street" mandatory={true}>
          <Input
            placeholder="..."
            value={detailedAddress.street}
            onChange={(event) =>
              setDetailedAddress((prevAddress) => ({
                ...prevAddress,
                street: event.target.value,
              }))
            }
          />
        </FormItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <FormItem label="City" mandatory={true}>
            <Input
              value={detailedAddress.city}
              onChange={(event) =>
                setDetailedAddress((prevAddress) => ({
                  ...prevAddress,
                  city: event.target.value,
                }))
              }
            />
          </FormItem>
          <FormItem label="State" mandatory={true}>
            <Input
              value={detailedAddress.state}
              onChange={(event) =>
                setDetailedAddress((prevAddress) => ({
                  ...prevAddress,
                  state: event.target.value,
                }))
              }
            />
          </FormItem>
          <FormItem label="Zip code">
            <Input />
          </FormItem>
        </div>
        <div>
          {!detailedAddress.state ||
            !detailedAddress.city ||
            detailedAddress.street ? (
            <div>
              <Label>Detailed address</Label>
              <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {`${detailedAddress.street}, ${detailedAddress.city}, ${detailedAddress.state}`}
              </span>
            </div>
          ) : null}

        
        
        </div>

        <div className="flex justify-between">
          <div></div>
          <div className="space-x-4 ">
            <button
              type="button"
              className="ttnc-ButtonSecondary px-6 py-3  active:scale-90 transition duration-150 rounded-full font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={handlePrevious}
            >
              Go Back
            </button>

            <button
              type="button"
              className="ttnc-ButtonPrimary px-6 py-3  active:scale-90 transition duration-150 rounded-full disabled:bg-opacity-70 bg-primary-500 hover:bg-primary-700 text-neutral-50 "
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationForm;
