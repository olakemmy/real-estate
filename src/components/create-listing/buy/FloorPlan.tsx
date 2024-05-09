import NcInputNumber from "@/components/NcInputNumber";
import React, { FC, useEffect, useState } from "react";
import Select from "@/shared/Select";
import FormItem from "./FormItem";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import Input from "@/shared/Input";
import { formData } from "@/interfaces/property";

export interface PageAddListing3Props {}

export interface NcInputNumberProps {
  className?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
  formData: formData;
  onNextPage: (data: formData) => void;
  onPreviousPage: (data: formData) => void;
}

const PageAddListing3: FC<NcInputNumberProps> = ({
  formData,
  onNextPage,
  onPreviousPage,
  className = "w-full",
  defaultValue = 4,
  min = 0,
  max,
  onChange,
  label,

  desc,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [floorPlan, setFloorPlan] = useState(formData.floorPlan);

  console.log("floorPlan", floorPlan);

  function handleNext() {
    const data: formData = {
      ...formData,
      floorPlan,
    };
    onNextPage(data);
  }

  function handlePrevious() {
    const data: formData = {
      ...formData,
      floorPlan,
    };
    onPreviousPage(data);
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">Floor plan information</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}

        <FormItem label="Number of floors">
          <Input
            type="number"
            placeholder="Enter number of floors"
            value={floorPlan.numberOfFloors || undefined}
            onChange={(event) =>
              setFloorPlan((prevPlan) => ({
                ...prevPlan,
                numberOfFloors: parseInt(event.target.value),
              }))
            }
          />
        </FormItem>

        <FormItem
          label="Bathroom Size"
          desc="The bathroom size unit will be added by default - Sq ft "
        >
          <Input
            placeholder="Enter bathroom size"
            value={floorPlan.numeberOfGarages || undefined}
            onChange={(event) =>
              setFloorPlan((prevPlan) => ({
                ...prevPlan,
                bathroomSize: `${event.target.value} Sq Ft`,
              }))
            }
          />
        </FormItem>

        <div className="flex justify-between">
          <div></div>
          <div className="space-x-4 ">
            <button
              type="button"
              className="ttnc-ButtonSecondary px-6 py-3  rounded-full font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={handlePrevious}
            >
              Go Back
            </button>

            <button
              type="button"
              className="ttnc-ButtonPrimary px-6 py-3  rounded-full disabled:bg-opacity-70 bg-primary-500 hover:bg-primary-700 text-neutral-50 "
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAddListing3;
