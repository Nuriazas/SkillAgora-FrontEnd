import React, { memo } from "react";

const BackgroundCircle = memo(({ className, delay }) => (
  <div
    className={`absolute w-56 h-56 rounded-full bg-gradient-to-br from-lightCyan to-lightBlue dark:from-darkCyan dark:to-darkBlue opacity-5 z-0 animate-smooth-pulse ${className}`}
    style={{ animationDelay: `${delay}ms` }}
  />
));

BackgroundCircle.displayName = "BackgroundCircle";

export const Background = memo(() => (
  <div className="pointer-events-none select-none absolute inset-0 w-full h-full">
    <BackgroundCircle
      className="hidden sm:block left-[-70px] top-[-40px]"
      delay={0}
    />
    <BackgroundCircle
      className="hidden sm:block right-[-70px] top-[-40px]"
      delay={100}
    />
    <div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-br from-lightCyan to-lightBlue dark:from-darkCyan dark:to-darkBlue opacity-5 z-0 animate-smooth-pulse"
      style={{ animationDelay: "200ms" }}
    />
    <BackgroundCircle
      className="hidden sm:block left-[-70px] bottom-[-40px]"
      delay={300}
    />
    <BackgroundCircle
      className="hidden sm:block right-[-70px] bottom-[-40px]"
      delay={400}
    />
  </div>
));

Background.displayName = "Background";
