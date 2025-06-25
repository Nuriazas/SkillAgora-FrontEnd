import React from "react";
import { FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import DefaultImage from "../../../assets/defaultLogo.png";

// Componente ServiceHeader para mostrar la cabecera del servicio
const ServiceHeader = ({ title, service, onClose }) => {
  const { t } = useTranslation();
  
   const imageUrl = service.media?.[0]?.media_url 
 ? `http://localhost:3000/uploads/${service.media[0].media_url}` 
 : DefaultImage;

 console.log("LLEGA LA IMAGEN A SERVICEHEADER", imageUrl);

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt={t("serviceModal.serviceImageAlt", { title: title || t('serviceModal.defaultServiceTitle') })}
        className="w-full h-64 object-cover rounded-t-2xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-t-2xl"></div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-800/90 hover:bg-gray-700/90 p-2 rounded-full transition-colors backdrop-blur-sm"
        aria-label={t('common.closeModal')}
      >
        <FiX className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );
};

export default ServiceHeader;