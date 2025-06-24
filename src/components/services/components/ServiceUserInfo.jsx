import React from "react";
import { FiMapPin } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import DefaultAvatar from "../../../assets/defaultAvatar.jpeg";

// Componente ServiceUserInfo para mostrar información del usuario del servicio
const ServiceUserInfo = ({ userName, place, avatar }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center space-x-3 mb-6">
      <img
        src={avatar || DefaultAvatar}
        alt={t("avatar.profilePicture", { name: userName || t('serviceModal.unknownUser') })}
        className="w-12 h-12 rounded-full border-2 border-purple-500/50"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DefaultAvatar;
        }}
      />
      <div>
        <h3 className="font-semibold text-white">
          {userName || t('serviceModal.unknownUser')}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <FiMapPin className="w-4 h-4" />
          <span>{place || t("serviceModal.remote")}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceUserInfo;