import { useState, useEffect, useCallback } from "react";

const THEME_KEY = "theme";
const DEFAULT_THEME = "light";

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    return localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
  });

  const applyTheme = useCallback((newTheme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }, []);

  const setCustomTheme = useCallback((newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setTheme(newTheme);
    }
  }, []);

  return {
    theme,
    toggleTheme,
    setTheme: setCustomTheme,
    isDark: theme === "dark",
  };
};
