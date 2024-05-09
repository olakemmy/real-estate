import React, { ChangeEvent, FC, useEffect, useState } from "react";
import Checkbox from "@/shared/Checkbox";
import { formData } from "@/interfaces/property";

interface Feature {
  name: string;
  icon: string;
}

export interface PageAddListing4Props {
  formData: formData;
  onNextPage: (data: formData) => void;
  onPreviousPage: (data: formData) => void;
}

const Amenities: FC<PageAddListing4Props> = ({
  formData,
  onNextPage,
  onPreviousPage,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [amenities, setAmenities] = useState<Feature[]>(
    formData.amenities || []
  );

  console.log("features", amenities);

  function handleNext() {
    const data: formData = {
      ...formData,
      amenities,
    };
    onNextPage(data);
  }

  function handlePrevious() {
    const data: formData = {
      ...formData,
      amenities,
    };
    onPreviousPage(data);
  }

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    name: string,
    icon: string
  ) => {
    const checked = event.target.checked;
    if (checked) {
      setAmenities((prevAmenities) => [...prevAmenities, { name, icon }]);
    } else {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity.name !== name)
      );
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Amenities </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Many customers have searched for accommodation based on amenities
          criteria
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Checkbox
              label="Air conditioning"
              name="Air Conditioning"
              icon="la-radiation-alt"
              onChange={handleCheckboxChange}
              amenities={amenities}
            />

            <Checkbox
              label="Private entrance"
              name="Private entrance"
              icon="la-door-open"
              onChange={handleCheckboxChange}
              amenities={amenities}
            />
            <Checkbox
              label="Dishwasher"
              name="Dishwasher"
              icon="la-utensils"
              onChange={handleCheckboxChange}
              amenities={amenities}
            />

            <Checkbox
              label="Fridge"
              name="Fridge"
              icon="la-box"
              onChange={handleCheckboxChange}
              amenities={amenities}
            />
            <Checkbox
              label="Swimming Pool"
              name="Swimming Pool"
              icon="la-swimming-pool"
              onChange={handleCheckboxChange}
              amenities={amenities}
            />
            <Checkbox
              label="Jacuzzi"
              name="Jacuzzi"
              icon="la-bath"
              onChange={handleCheckboxChange}
              amenities={amenities}
            />
            <Checkbox
              label="Washing machine"
              name="Washing machine"
              icon="la-box-open"
              onChange={handleCheckboxChange}
              amenities={amenities}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div></div>
        <div className="space-x-4 ">
          <button
            type="button"
            className="ttnc-ButtonSecondary px-6 py-3 rounded-full font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
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
    </>
  );
};

export default Amenities;
