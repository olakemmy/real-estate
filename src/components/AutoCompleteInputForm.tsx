import React, { useState, useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface AutoCompleteInputFormProps {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setSuggestions: React.Dispatch<React.SetStateAction<any[]>>;
  address: string;
  suggestions: any[];
}

const AutoCompleteInputForm = ({
  setAddress,
  setSuggestions,
  address,
  suggestions,
}: AutoCompleteInputFormProps) => {
  const handleChange = async (event: { target: { value: any } }) => {
    setAddress(event.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?country=ng&access_token=${process.env.mapbox_key}`;
      const response = await fetch(endpoint);
      const results = await response.json();

      setSuggestions(results?.features);
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

  return (
    <div className="relative">
      <div className=" relative">
        <input
          type="text"
          value={address}
          className="block w-full  border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3"
          placeholder="Location"
          onChange={handleChange}
        />
      </div>

      {suggestions?.length > 0 && (
        <div className="absolute left-0 z-40  min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => {
            return (
              <div
                className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-3 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                key={index}
                onClick={() => {
                  setAddress(suggestion.place_name);
                  setSuggestions([]);
                }}
              >
                <span className="block text-neutral-400">
                  {/* <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" /> */}
                  <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                </span>
                <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                  {suggestion.place_name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteInputForm;
