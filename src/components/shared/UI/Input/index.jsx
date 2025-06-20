import React from "react";

export const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  className = "",
  error,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-lightGrayText dark:text-darkGrayText mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 rounded-lg
          bg-lightCard dark:bg-darkCard
          text-lightText dark:text-darkText
          border border-gray-200 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-lightBlue dark:focus:ring-darkBlue
          ${error ? "border-red-500 dark:border-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
