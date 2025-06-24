import React from "react";
import { Background } from "../components/shared/Background/index.jsx";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
  const { t } = useTranslation();
  return (
      <main className="relative min-h-screen overflow-hidden bg-transparent">
      
        <Background />
      
      <section className="relative z-10 flex flex-col justify-center items-center bg-transparent bg-opacity-90 text-white text-center p-4 sm:px-20 sm:py-12 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-white">{t('notFound.title')}</h1>
        <p className="text-base sm:text-xl">{t('notFound.description')}</p>
      </section>
    </main>
  );
}
export default NotFoundPage;
