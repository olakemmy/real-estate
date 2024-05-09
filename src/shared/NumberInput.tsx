import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

// eslint-disable-next-line react/display-name
const NumberInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-sm font-normal",
      rounded = "rounded-2xl",
      children,
      type = "text",
      onChange,
      value,

      ...args
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputNumber = parseInt(event.target.value, 10);

      if (isNaN(inputNumber) || !event.target.validity.valid) {
        // If the input is not a valid number or not a whole number, set the value to an empty string
        onChange?.({ ...event, target: { ...event.target, value: "" } });
      } else {
        // If the input is a valid whole number, update the value
        onChange?.({
          ...event,
          target: { ...event.target, value: inputNumber.toString() },
        });
      }
    };

    return (
      <input
        value={value}
        onChange={handleChange}
        ref={ref}
        type="number"
        className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
        {...args}
        pattern="^[0-9]*$"
      />
    );
  }
);

export default NumberInput;
