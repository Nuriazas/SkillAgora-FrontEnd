import React from "react";
import { useTranslation } from "react-i18next";

// Componente para el botón de acción del servicio
const ServiceActionButton = ({ orderStatus, handleHireService }) => {
  const { t } = useTranslation();
  
  if (!orderStatus) {
    return (
      <button
        onClick={handleHireService}
        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25"
      >
        {t("serviceModal.hireService")}
      </button>
    );
  }

  if (orderStatus.loading) {
    return (
      <button
        disabled
        className="px-8 py-3 bg-gray-600 text-white rounded-xl font-semibold opacity-50 cursor-not-allowed flex items-center gap-2"
      >
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        {t("serviceModal.verifying")}
      </button>
    );
  }

  if (orderStatus.hasActiveOrder) {
    const statusLabels = {
      pending: t("serviceModal.orderStatus.pending"),
      accepted: t("serviceModal.orderStatus.accepted"), 
      in_progress: t("serviceModal.orderStatus.inProgress")
    };

    return (
      <div className="px-8 py-3 bg-yellow-600/80 text-white rounded-xl font-semibold text-center">
        <div className="text-sm">{t("serviceModal.alreadyHired")}</div>
        <div className="text-xs opacity-80">
          {t("serviceModal.status")}: {statusLabels[orderStatus.orderStatus] || orderStatus.orderStatus}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleHireService}
      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25"
    >
      {t("serviceModal.hireService")}
    </button>
  );
};

export default ServiceActionButton;