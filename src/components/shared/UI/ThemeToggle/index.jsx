import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../../hooks/useTheme";
import { Button } from "../index";

export const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <Button
      onClick={handleThemeToggle}
      className="bg-lightCard hover:bg-gray-100 dark:bg-darkCard dark:text-darkText dark:hover:bg-gray-700 dark:focus:ring-darkBlue text-lightText"
      aria-label={t(
        `theme.${theme === "light" ? "switchToDark" : "switchToLight"}`
      )}
      title={t(`theme.${theme === "light" ? "switchToDark" : "switchToLight"}`)}
    >
      <span role="img" aria-hidden="true">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </Button>
  );
});

ThemeToggle.displayName = "ThemeToggle";