import React from "react";
import { useTranslation } from "react-i18next";
import ServiceActionButton from "./ServiceActionButton.jsx";

// Componente para el pie de página del servicio
const ServiceFooter = ({ price, orderStatus, handleContactSeller, handleHireService }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        ${price || '0'}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleContactSeller}
          className="px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-semibold border border-gray-600/50"
        >
          {t("serviceModal.contact")}
        </button>
        <ServiceActionButton
          orderStatus={orderStatus}
          handleHireService={handleHireService}
        />
      </div>
    </div>
  );
};

export default ServiceFooter;