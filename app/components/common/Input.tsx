import React from "react";

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string ;
  type?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  value,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-white font-medium text-sm">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        className="p-2 rounded-md bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-sm ">{error}</p>}
    </div>
  );
};

export default Input;
