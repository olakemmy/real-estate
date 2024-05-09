import React, { FC, useEffect, useState } from "react";
import FormItem from "./FormItem";
import { formData } from "@/interfaces/property";
import Error from "@/components/Error";
import NumberInput from "@/shared/NumberInput";

export interface PageAddListing3Props {}

export interface NcInputNumberProps {
  formData: formData;
  onNextPage: (data: formData) => void;
  onPreviousPage: (data: formData) => void;
  className?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
}

const PropertyAttributes: FC<NcInputNumberProps> = ({
  formData,
  onNextPage,
  onPreviousPage,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [propertyAttributes, setPropertyAttributes] = useState(
    formData.propertyAttributes
  );
  const [error, setError] = useState("");

  console.log(propertyAttributes.numberOfBedrooms);

  function handleNext() {
    let errorMessage = "";

    if (propertyAttributes.numberOfBedrooms < 1) {
      errorMessage += "Please enter number of bedrooms. ";
    }
    if (propertyAttributes.numberOfBathrooms < 1) {
      errorMessage += "Please enter number of bathrooms. ";
    }

    if (errorMessage) {
      window.scrollTo(0, 0);
      setError(errorMessage);
    } else {
      const data: formData = {
        ...formData,
        propertyAttributes,
      };
      onNextPage(data);
    }
  }

  const handleCloseError = () => {
    setError("");
  };

  function handlePrevious() {
    const data: formData = {
      ...formData,
      propertyAttributes,
    };
    onPreviousPage(data);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Property Attributes Information
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mt-8"></div>

      {/* FORM */}
      {error && <Error error={error} onClose={handleCloseError} />}

      <div className="space-y-8 my-8">
        <FormItem label="Bedrooms" mandatory={true}>
          <NumberInput
            type="number"
            min={0}
            placeholder="Enter number of bedrooms"
            value={
              propertyAttributes.numberOfBedrooms === 0
                ? ""
                : propertyAttributes.numberOfBedrooms
            }
            onChange={(event) => {
              setPropertyAttributes((prevAttributes) => ({
                ...prevAttributes,
                numberOfBedrooms: parseInt(event.target.value),
              }));
            }}
            onKeyDown={(event) => {
              // Check if the pressed key is a valid number
              const charCode = event.which ? event.which : event.keyCode;
              if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
              }
            }}
          />
        </FormItem>

        <FormItem label="Bathroom" mandatory={true}>
          <NumberInput
            type="number"
            min={0}
            placeholder="Enter number of bathrooms"
            value={
              propertyAttributes.numberOfBathrooms === 0
                ? ""
                : propertyAttributes.numberOfBathrooms
            }
            onChange={(event) =>
              setPropertyAttributes((prevAttributes) => ({
                ...prevAttributes,
                numberOfBathrooms: parseInt(event.target.value),
              }))
            }
            onKeyDown={(event) => {
              // Check if the pressed key is a valid number
              if (
                event.key.length === 1 &&
                !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                  event.key
                )
              ) {
                event.preventDefault();
              }
            }}
          />
        </FormItem>

        <FormItem label="Garages">
          <NumberInput
            type="number"
            placeholder="Enter number of garages"
            min={0}
            value={
              propertyAttributes.numberOfGarages === 0
                ? ""
                : propertyAttributes.numberOfGarages
            }
            onChange={(event) =>
              setPropertyAttributes((prevAttributes) => ({
                ...prevAttributes,
                numberOfGarages: parseInt(event.target.value),
              }))
            }
            onKeyDown={(event) => {
              // Check if the pressed key is a valid number
              if (
                event.key.length === 1 &&
                !["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
                  event.key
                )
              ) {
                event.preventDefault();
              }
            }}
          />
        </FormItem>
        <FormItem
          label="Size"
          desc="The property size unit will be added by defaul - Sq ft "
        >
          <NumberInput
            placeholder="Enter property size"
            value={propertyAttributes.numeberOfGarages || undefined}
            onChange={(event) =>
              setPropertyAttributes((prevAttributes) => ({
                ...prevAttributes,
                size: `${event.target.value} Sq Ft`,
              }))
            }
          />
        </FormItem>
        <FormItem label="Year Built">
          <NumberInput
            placeholder="Enter property built year"
            value={propertyAttributes.numeberOfGarages}
            onChange={(event) =>
              setPropertyAttributes((prevAttributes) => ({
                ...prevAttributes,
                yearBuilt: event.target.value,
              }))
            }
          />
        </FormItem>

        <div className="flex justify-between">
          <div></div>
          <div className="space-x-4 ">
            <button
              type="button"
              className="ttnc-ButtonSecondary px-6 py-3   rounded-full font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={handlePrevious}
            >
              Go Back
            </button>

            <button
              type="button"
              className="ttnc-ButtonPrimary px-6 py-3   rounded-full disabled:bg-opacity-70 bg-primary-500 hover:bg-primary-700 text-neutral-50 "
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

export default PropertyAttributes;
