import React, { ButtonHTMLAttributes } from "react";

export interface ButtonCircleProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string;
  isSuccess?: boolean; // Add isSuccess prop
}

const ButtonCircle: React.FC<ButtonCircleProps> = ({
  className = " ",
  size = "w-9 h-9",
  isSuccess = false, // Default to false
  ...args
}) => {
  return (
    <button
      className={`ttnc-ButtonCircle flex items-center justify-center rounded-full !leading-none disabled:bg-opacity-70 ${
        isSuccess
          ? "bg-green-500 hover:bg-green-700 text-white" // Apply green background and white text for success
          : "bg-primary-500 hover:bg-primary-700 text-neutral-50" // Default styles
      } ${className} ${size}`}
      {...args}
    />
  );
};

export default ButtonCircle;
