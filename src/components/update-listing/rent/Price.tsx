import React, { FC, useEffect, useState } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "./FormItem";
import { formData } from "@/interfaces/property";
import Error from "@/components/Error";

export interface PageAddListing8Props {
  formData: formData;
  onNextPage: (data: formData) => void;
  onPreviousPage: (data: formData) => void;
}

const PageAddListing8: FC<PageAddListing8Props> = ({
  formData,
  onPreviousPage,
  onNextPage,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [priceForRent, setPriceForRent] = useState<number | null>(
    formData.priceForRent
  );
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("propertyImageList", formData.propertyImageList);
  });

  function handlePriceChange(e: { target: { value: string } }) {
    const value = parseInt(e.target.value);
    setPriceForRent(isNaN(value) ? null : value);
  }
  function handleNext() {
    console.log(formData);

    let errorMessage = "";
    if (!priceForRent) {
      errorMessage = "Please enter property price. ";
    }

    if (errorMessage) {
      window.scrollTo(0, 0);
      setError(errorMessage);
    } else {
      const data: formData = {
        ...formData,
        priceForRent,
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
      priceForRent,
    };
    onPreviousPage(data);
  }

  return (
    <form>
      {error && <Error error={error} onClose={handleCloseError} />}

      <div>
        <h2 className="text-2xl font-semibold">Price your space</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {` The host's revenue is directly dependent on the setting of rates and
            regulations on the number of guests, the number of nights, and the
            cancellation policy.`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Currency">
          <Select>
            <option value="NGN">NGN</option>
          </Select>
        </FormItem>
        <FormItem label="Property price" mandatory={true}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₦</span>
            </div>

            <Input
              className="!pl-8 !pr-10"
              placeholder="0.00"
              type="number"
              value={priceForRent === null ? "" : priceForRent.toString()}
              onChange={handlePriceChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">NGN</span>
            </div>
          </div>
        </FormItem>

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
              onClick={handleNext}
              type="button"
              className="ttnc-ButtonPrimary px-6 py-3 rounded-full disabled:bg-opacity-70 bg-primary-500 hover:bg-primary-700 text-neutral-50  active:scale-90 transition duration-150"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PageAddListing8;
