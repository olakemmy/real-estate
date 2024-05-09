import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
      // Ensure only whole numbers (no decimals) are allowed
      const inputNumber = parseInt(event.target.value, 10);

      if (isNaN(inputNumber)) {
        // If the input is not a valid number, set the value to an empty string
        onChange?.({ ...event, target: { ...event.target, value: "" } });
      } else {
        // If the input is a valid number, update the value
        onChange?.({ ...event, target: { ...event.target, value: inputNumber.toString() } });
      }
    };
    return (
      <input
        value={value}
        onChange={onChange}
        ref={ref}
        type={type}
        className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${rounded} ${fontClass} ${sizeClass} ${className}`}
        {...args}
      />
    );
  }
);

export default Input;
