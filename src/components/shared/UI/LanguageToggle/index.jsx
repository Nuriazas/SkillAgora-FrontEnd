import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../index";

export const LanguageToggle = memo(() => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  }, [i18n]);

  const currentLang = i18n.language;
  const nextLang = currentLang === "es" ? "en" : "es";

  return (
    <Button
      onClick={toggleLanguage}
      className="bg-lightCard hover:bg-gray-100 dark:bg-darkCard dark:text-darkText dark:hover:bg-gray-700 dark:focus:ring-darkBlue text-lightText"
      aria-label={t(`language.switchTo${nextLang.toUpperCase()}`)}
      title={t(`language.switchTo${nextLang.toUpperCase()}`)}
    >
      <span className="uppercase" aria-hidden="true">
        {nextLang}
      </span>
    </Button>
  );
});

LanguageToggle.displayName = "LanguageToggle";
