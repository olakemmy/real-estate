import React, { FC, useEffect, useState } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "./FormItem";
import { formData } from "@/interfaces/property";
import Error from "@/components/Error";
import { useDispatch, useSelector } from "react-redux";
import { resetImages, setChanges } from "@/features/images/imageSlice";
import { useRouter } from "next/router";

export interface PageAddListing8Props {
  formData: formData;
  onSubmit: any;
  onPreviousPage: (data: formData) => void;
}

const PageAddListing8: FC<PageAddListing8Props> = ({
  formData,
  onPreviousPage,
  onSubmit,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [priceForBuy, setPriceForBuy] = useState<number | null>(
    formData.priceForBuy
  );
  const [error, setError] = useState("");
  const { loading } = useSelector((state: any) => state.properties);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const createdListing = useSelector((state: any) => state.properties.property);

  useEffect(() => {
    console.log("propertyImageList", formData.propertyImageList);
  });

  function handlePriceChange(e: { target: { value: string } }) {
    const value = parseInt(e.target.value);
    setPriceForBuy(isNaN(value) ? null : value);
  }

  const handleCloseError = () => {
    setError("");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormSubmitted(true);
    dispatch(resetImages());
    dispatch(setChanges(false));

    if (priceForBuy === null || isNaN(priceForBuy)) {
      setError("Please enter a valid price for the property.");
      return;
    }

    const updatedFormData: formData = {
      ...formData,
      priceForBuy: priceForBuy,
    };

    await onSubmit(updatedFormData);
  };

  useEffect(() => {
    if (
      formSubmitted &&
      createdListing &&
      Object.keys(createdListing).length !== 0
    ) {
      router.push(
        `/${createdListing.listingType?.toLowerCase()}/listingdetails/${
          createdListing.id
        }`
      );
    }
  }, [createdListing, dispatch]);

  function handlePrevious() {
    const data: formData = {
      ...formData,
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
              value={priceForBuy === null ? "" : priceForBuy.toString()}
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
              type="submit"
              onClick={handleSubmit}
              className="ttnc-ButtonPrimary px-6 py-3 rounded-full disabled:bg-opacity-70 bg-primary-500 hover:bg-primary-700 text-neutral-50 "
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PageAddListing8;
