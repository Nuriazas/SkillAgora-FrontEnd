import React from "react";
import { FiClock, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Componente ServiceStats para mostrar estadísticas del servicio
const ServiceStats = ({ deliveryTimeDays, rating, reviews, serviceId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
        <div className="flex items-center space-x-2 mb-2">
          <FiClock className="w-5 h-5 text-purple-400" />
          <span className="font-medium text-white text-sm">
            {t("serviceModal.deliveryTime")}
          </span>
        </div>
        <span className="text-gray-400">
          {deliveryTimeDays || "3"} {t("serviceModal.days")}
        </span>
      </div>
      <div
        onClick={() => navigate(`/review/${serviceId}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate(`/review/${serviceId}`);
          }
        }}
        className="cursor-pointer bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 hover:bg-gray-700/50 transition-colors"
        aria-label={t('serviceModal.rateService')}
      >
        <div className="flex items-center space-x-2 mb-2">
          <FiStar className="w-5 h-5 text-yellow-400" />
          <span className="font-medium text-white text-sm">
            {t("serviceModal.rating")}
          </span>
        </div>
        <span className="text-gray-400">
          {rating || "5.0"} (
          {reviews || "0"} {t("serviceModal.reviews")})
        </span>
      </div>
    </div>
  );
};

export default ServiceStats;