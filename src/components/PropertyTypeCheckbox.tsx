import { useEffect, useState } from "react";

interface PropertyTypeCheckboxProps {
  name: string;
  onChange: (name: string, newValue: boolean) => void;
  isChecked: boolean;
}

const PropertyTypeCheckbox = ({
  name,
  onChange,
  isChecked,
}: PropertyTypeCheckboxProps) => {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange(name, newValue);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="h-5 w-5 text-blue-600 rounded"
      />
      <label htmlFor={name} className="ml-2 text-gray-700">
        {name}
      </label>
    </div>
  );
};
export default PropertyTypeCheckbox;