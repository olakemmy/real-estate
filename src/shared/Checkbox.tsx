import React, { ChangeEvent, ChangeEventHandler, FC } from "react";

interface Feature {
  name: string;
  icon: string;
}

export interface CheckboxProps {
  label?: string;
  subLabel?: string | boolean;
  className?: string;
  name: string;
  icon: string;
  defaultChecked?: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    name: string,
    icon: string
  ) => void;
  value?: string;
  amenities?: Feature[];
  checked?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({
  amenities,
  subLabel = "",
  label = "",
  name,
  icon,
  className = "",
  value,
  onChange,
  checked,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event, name, icon);
  };
  const isChecked = amenities?.some((amenity) => amenity.name === name);

  return (
    <div className={`flex text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        value={value}
        type="checkbox"
        defaultChecked={isChecked}
        className="focus:ring-action-primary h-6 w-6 text-primary-500 border-primary rounded border-neutral-500 bg-white dark:bg-neutral-700  dark:checked:bg-primary-500 focus:ring-primary-500"
        onChange={handleChange}
        checked={checked}
      />
      {label && (
        <label
          htmlFor={name}
          className="ml-3.5 flex flex-col flex-1 justify-center"
        >
          <span className=" text-neutral-900 dark:text-neutral-100">
            {label}
          </span>
        </label>
      )}
    </div>
  );
};

export default Checkbox;
