import React, { FC, useEffect, useState } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "./FormItem";
import AutoCompleteInputForm from "@/components/AutoCompleteInputForm";
import { PropertyAttributes, formData } from "@/interfaces/property";
import Error from "@/components/Error";

export interface PageAddListing1Props {
  formData: formData;
  onNextPage: (data: formData) => void;
}

const PropertTypeForm: FC<PageAddListing1Props> = ({
  formData,
  onNextPage,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [title, setTitle] = useState(formData.title);
  const [address, setAddress] = useState(formData.address);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [propertyAttributes, setPropertyAttributes] = useState(
    formData.propertyAttributes
  );

  function handleNext() {
    console.log(formData);

    let errorMessage = "";
    if (!title) {
      errorMessage += "Please enter a property title. ";
    }
    if (!address) {
      errorMessage += "Please enter an address. ";
    }
    if (!propertyAttributes.propertyType) {
      errorMessage += "Please enter an property type. ";
    }
    if (errorMessage) {
      window.scrollTo(0, 0);
      setError(errorMessage);
    } else {
      const data: formData = {
        ...formData,
        title,
        address,
        propertyAttributes,
      };
      onNextPage(data);
    }
  }

  const handleCloseError = () => {
    setError("");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mt-8"></div>

      {error && <Error error={error} onClose={handleCloseError} />}
      <div className="my-8 space-y-6">
        <FormItem mandatory={true} label="Choose a property type" desc="">
          <Select
            value={propertyAttributes?.propertyType}
            onChange={(event) =>
              setPropertyAttributes((prevAttributes) => ({
                ...prevAttributes,
                propertyType: event.target.value,
              }))
            }
          >
            <option value="">Select property type</option>
            <option value="Duplex">Duplex</option>
            <option value="Maisonette">Maisonette</option>
            <option value="Shop">Shop</option>
            <option value="Office Space">Office Space</option>
            <option value="Apartment">Apartment</option>
            <option value="Bungalow">Bungalow</option>
            <option value="Commercial Properties">Commercial Properties</option>
          </Select>
        </FormItem>

        <FormItem mandatory={true} label="Title" desc="">
          <Input
            placeholder="Property title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormItem>

        <FormItem mandatory={true} label="Address" desc="">
          <AutoCompleteInputForm
            address={address}
            suggestions={suggestions}
            setAddress={setAddress}
            setSuggestions={setSuggestions}
          />
        </FormItem>

        <div className="flex justify-between mt-6">
          <div></div>
          <button
            type="button"
            className="ttnc-ButtonPrimary px-6 py-3 rounded-full disabled:bg-opacity-70 bg-primary-500 hover:bg-primary-700 text-neutral-50  active:scale-90 transition duration-150"
            onClick={handleNext}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertTypeForm;
