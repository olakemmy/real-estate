import React, { FC, useEffect, useState } from "react";
import Textarea from "@/shared/Textarea";
import { formData } from "@/interfaces/property";
import Error from "@/components/Error";

export interface PageAddListing6Props {
  formData: formData;
  onNextPage: (data: formData) => void;
  onPreviousPage: (data: formData) => void;
}

const Description: FC<PageAddListing6Props> = ({
  formData,
  onNextPage,
  onPreviousPage,
}) => {
  const [description, setDescription] = useState(formData.description);
  const [error, setError] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleNext() {
    let errorMessage = "";
    if (!description) {
      errorMessage += "Please enter a description.";
    }

    if (errorMessage) {
      window.scrollTo(0, 0);
      setError(errorMessage);
    } else {
      const data: formData = {
        ...formData,
        description,
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
      description,
    };
    onPreviousPage(data);
  }

  return (
    <div>
      <div>
        {error && <Error error={error} onClose={handleCloseError} />}

        <div className="flex">
          <h2 className="text-2xl font-semibold">
            Your place description for client{" "}
          </h2>{" "}
          <span className="text-red-500">*</span>
        </div>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Mention the best features of your accommodation, any special amenities
          like fast Wi-Fi or parking, as well as things you like about the
          neighborhood.
        </span>
      </div>

      <Textarea
        placeholder="..."
        rows={14}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex mt-5 justify-between">
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
            className="ttnc-ButtonPrimary px-6 py-3 rounded-full disabled:bg-opacity-70 bg-primary-500 hover:bg-primary-700 text-neutral-50 "
            onClick={handleNext}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Description;
