import React from "react";

interface SelectProps {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="text-white font-medium mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="p-2 rounded-md bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Выберите</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm ">{error}</p>}
    </div>
  );
};

export default Select;
