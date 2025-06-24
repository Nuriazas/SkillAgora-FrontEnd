import React from "react";
import { useTranslation } from "react-i18next";

// Componente para mostrar el contenido del servicio
const ServiceContent = ({ title, description, categoryName }) => {
  const { t } = useTranslation();
  
  return (
    <>
      <h2 id="modal-title" className="text-2xl font-bold text-white mb-4">
        {title || t('serviceModal.noTitleAvailable')}
      </h2>
      {categoryName && (
        <div className="text-xs text-gray-400 font-semibold mb-1">
          {categoryName}
        </div>
      )}
      <p className="text-gray-400 mb-6 leading-relaxed">
        {description || t('serviceModal.noDescriptionAvailable')}
      </p>
    </>
  );
};

export default ServiceContent;