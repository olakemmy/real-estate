import React, { useEffect, useState } from "react";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "./Headers/HeroSearchForm/ClearDataButton";
import GeocodingClient from "@mapbox/mapbox-sdk/services/geocoding";

const geocodingClient = GeocodingClient({
  accessToken: process.env.mapbox_key as string,
});

interface AutoCompleteInputProps {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setSuggestions: React.Dispatch<React.SetStateAction<any[]>>;
  address: string;
  suggestions: any[];
  showPopover?: boolean;
  placeHolder?: string;
  desc?: string;

}

const AutoCompleteInput = ({
  setAddress,
  setSuggestions,
  address = "",
  suggestions,
  showPopover,
  placeHolder,
  desc,
}: AutoCompleteInputProps) => {
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
    <>
      <div className="flex-grow">
        <input
          type="text"
          value={address}
          className="block w-full relative h-[50px] bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate"
          placeholder={placeHolder}
          onChange={handleChange}
        />

        <span className="block -mt-[12px] absolute text-sm text-neutral-400 font-light">
          <span className="line-clamp-1">{!!address ? placeHolder : desc}</span>
        </span>
        {address && showPopover && (
          <ClearDataButton
            onClick={() => {
              setAddress("");
            }}
          />
        )}
      </div>


      {suggestions?.length > 0 && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {suggestions.map(
            (
              suggestion: {
                place_name:
                | string
                | number
                | boolean
                | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              },
              index: React.Key | null | undefined
            ) => {
              return (
                <div
                  className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                  key={index}
                  onClick={() => {
                    if (typeof suggestion.place_name === "string") {
                      setAddress(suggestion.place_name);
                      setSuggestions([]);
                    }
                  }}
                >
                  <span className="block text-neutral-400">
                    <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                  </span>
                  <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                    {suggestion.place_name}
                  </span>
                </div>
              );
            }
          )}
        </div>
      )}
    </>
  );
};

export default AutoCompleteInput;
