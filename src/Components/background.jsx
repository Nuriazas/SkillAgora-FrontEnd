import React from "react";

export const Background = () => (
  <div className="pointer-events-none select-none absolute inset-0 w-full h-full z-0 ">
    <div className="hidden sm:block absolute left-[-70px] top-[-40px] w-56 h-56 rounded-full bg-gradient-to-br from-lightCyan to-lightBlue dark:from-darkCyan dark:to-darkBlue opacity-5 z-0 animate-smooth-pulse"></div>
    <div className="hidden sm:block absolute right-[-70px] top-[-40px] w-56 h-56 rounded-full bg-gradient-to-br from-lightCyan to-lightBlue dark:from-darkCyan dark:to-darkBlue opacity-5 z-0 animate-smooth-pulse delay-100"></div>
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-br from-lightCyan to-lightBlue dark:from-darkCyan dark:to-darkBlue opacity-5 z-0 animate-smooth-pulse delay-200"></div>
    <div className="hidden sm:block absolute left-[-70px] bottom-[-40px] w-56 h-56 rounded-full bg-gradient-to-br from-lightCyan to-lightBlue dark:from-darkCyan dark:to-darkBlue opacity-5 z-0 animate-smooth-pulse delay-300"></div>
    <div className="hidden sm:block absolute right-[-70px] bottom-[-40px] w-56 h-56 rounded-full bg-gradient-to-br from-lightCyan to-lightBlue dark:from-darkCyan dark:to-darkBlue opacity-5 z-0 animate-smooth-pulse delay-400"></div>
  </div>
);