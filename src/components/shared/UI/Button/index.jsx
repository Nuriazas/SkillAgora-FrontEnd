import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles = `
    px-4 py-2 rounded-lg font-medium
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-lightBlue dark:bg-darkBlue
      text-white
      hover:bg-blue-600 dark:hover:bg-blue-700
      focus:ring-lightBlue dark:focus:ring-darkBlue
    `,
    secondary: `
      bg-lightCard dark:bg-darkCard
      text-lightText dark:text-darkText
      hover:bg-gray-100 dark:hover:bg-gray-700
      focus:ring-gray-500
    `,
    danger: `
      bg-red-500
      text-white
      hover:bg-red-600
      focus:ring-red-500
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
