import Label from "@/components/Label";
import React, { FC } from "react";

export interface FormItemProps {
  className?: string;
  label?: string;
  desc?: string;
  mandatory?: boolean; 
  children?: React.ReactNode;
}

const FormItem: FC<FormItemProps> = ({
  children,
  className = "",
  label,
  desc,
  mandatory = false, // Set default value to false
}) => {
  return (
    <div className={className}>
      {label && (
        <Label>
          {label} {mandatory && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="mt-1">{children}</div>
      {desc && (
        <span className="block mt-3 text-xs text-neutral-500 dark:text-neutral-400 ">
          {desc}
        </span>
      )}
    </div>
  );
};

export default FormItem;
