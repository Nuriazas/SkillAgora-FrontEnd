import React from "react";

export const Select = ({ className = "", ...props }) => (
  <select
    className={`px-4 py-2 rounded-lg bg-lightCard dark:bg-darkCard text-lightText dark:text-darkText focus:outline-none focus:ring-2 focus:ring-lightBlue dark:focus:ring-darkBlue ${className}`}
    {...props}
  />
);