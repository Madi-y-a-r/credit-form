import React from "react";

interface RangeInputProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({
  id,
  label,
  min,
  max,
  step = 1,
  value,
  error,
  onChange,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="text-white font-medium mb-1">
        {label}: {value}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer"
      />
      {error && <p className="text-red-500 text-sm ">{error}</p>}
    </div>
  );
};

export default RangeInput;
