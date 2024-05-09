import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

export interface NcInputNumberProps {
  className?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
  value?: number;
}

const NcInputNumber: FC<NcInputNumberProps> = ({
  className = "w-full",
  defaultValue = 0,
  min = 0,
  max,
  onChange,
  label,
  desc,
  value,
}) => {
  const [inputValue, setInputValue] = useState<number>(value || defaultValue);
  const [isDecrementDisabled, setIsDecrementDisabled] =
    useState<boolean>(false);
  const [isIncrementDisabled, setIsIncrementDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    setInputValue(value || defaultValue);
  }, [value, defaultValue]);

  useEffect(() => {
    setIsDecrementDisabled(min >= inputValue);
    setIsIncrementDisabled(max !== undefined && max <= inputValue);
  }, [inputValue, min, max]);

  const handleClickDecrement = () => {
    if (min >= inputValue) return;
    const newValue = inputValue - 1;
    setInputValue(newValue);
    onChange && onChange(newValue);
  };

  const handleClickIncrement = () => {
    if (max !== undefined && max <= inputValue) return;
    const newValue = inputValue + 1;
    setInputValue(newValue);
    onChange && onChange(newValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10) || 0;
    setInputValue(newValue);
    onChange && onChange(newValue);
  };

  const renderLabel = () => {
    return (
      <div className="flex flex-col">
        <span className="font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </span>
        {desc && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
            {desc}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}
      data-nc-id="NcInputNumber"
    >
      {label && renderLabel()}

      <div
        className={`nc-NcInputNumber flex items-center justify-between w-28`}
      >
        <button
          className={`w-8 h-8 rounded-full flex items-center justify-center border ${
            isDecrementDisabled
              ? "border-neutral-300 dark:border-neutral-500 bg-gray-200 dark:bg-neutral-800 cursor-default"
              : "border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50"
          }`}
          type="button"
          onClick={handleClickDecrement}
          disabled={isDecrementDisabled}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={inputValue}
          className="w-3 hidden"
          onChange={handleChange}
        />
        <span>{inputValue}</span>
        <button
          className={`w-8 h-8 rounded-full flex items-center justify-center border ${
            isIncrementDisabled
              ? "border-neutral-300 dark:border-neutral-500 bg-gray-200 dark:bg-neutral-800 cursor-default"
              : "border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50"
          }`}
          type="button"
          onClick={handleClickIncrement}
          disabled={isIncrementDisabled}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NcInputNumber;
