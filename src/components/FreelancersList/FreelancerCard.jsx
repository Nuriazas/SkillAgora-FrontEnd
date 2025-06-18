import React from "react";
import { useTranslation } from "react-i18next";

const Card = ({ children, className = "", onClick, ...props }) => (
  <div
    className={`bg-lightCard dark:bg-darkCard rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);

export const FreelancerCard = ({ freelancer, viewMode, onClick }) => {
  const { t } = useTranslation();

  if (!freelancer) {
    return (
      <Card className="w-full h-64 animate-pulse bg-gray-200 dark:bg-gray-700" />
    );
  }

  // Valores por defecto para campos opcionales
  const {
    name = "",
    avatar = "https://via.placeholder.com/150",
    specialty = "general",
    location = t("freelancerCard.remote"),
    hourly_rate = 0,
    rating = 0,
    bio = "",
  } = freelancer;

  return (
    <Card
      className={`${viewMode === "list" ? "w-full flex-row" : "w-80"} p-4`}
      onClick={onClick}
    >
      <div
        className={`flex ${
          viewMode === "list"
            ? "flex-row items-center gap-4"
            : "flex-col items-center"
        }`}
      >
        <img
          src={avatar}
          alt={name}
          className={`${
            viewMode === "list" ? "w-16 h-16" : "w-24 h-24"
          } rounded-full object-cover border-4 border-lightBackground dark:border-darkBackground hover:scale-110 transition-transform`}
        />
        <div
          className={`flex flex-col ${
            viewMode === "list" ? "flex-1 text-left" : "text-center"
          }`}
        >
          <h3 className="text-lightText dark:text-darkText text-lg font-bold mb-1 truncate hover:text-lightBlue dark:hover:text-darkBlue transition-colors">
            {name}
          </h3>
          <div className="text-lightBlue dark:text-darkBlue text-xs font-semibold mb-1">
            {t(`freelancers.specialties.${specialty}`)}
          </div>
          <div className="text-lightGrayText dark:text-darkGrayText text-xs mb-2 flex items-center gap-1">
            <span role="img" aria-label={t("freelancerCard.location")}>
              📍
            </span>
            {location}
          </div>
          <div className="text-lightGrayText dark:text-darkGrayText text-xs mb-2 line-clamp-3">
            {bio || t(`freelancers.descriptions.${specialty}`)}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-lightText dark:text-darkText text-sm font-medium">
              {hourly_rate}
              {t("freelancerCard.perHour")}
            </div>
            <div className="text-yellow-500 text-base flex items-center gap-1">
              <span role="img" aria-label={t("freelancerCard.rating")}>
                ★
              </span>
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
