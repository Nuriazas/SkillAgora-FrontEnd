import React, { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../UI/Button";

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
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25"
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
