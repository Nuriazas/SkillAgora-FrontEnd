import React from "react";
import { FiMapPin } from "react-icons/fi";
import DefaultAvatar from "../../../assets/defaultAvatar.jpeg";

// Componente ServiceUserInfo para mostrar información del usuario del servicio
const ServiceUserInfo = ({ userName, place, avatar }) => {
  return (
    <div className="flex items-center space-x-3 mb-6">
      <img
        src={avatar || DefaultAvatar}
        alt={`Avatar de ${userName || 'Usuario'}`}
        className="w-12 h-12 rounded-full border-2 border-purple-500/50"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DefaultAvatar;
        }}
      />
      <div>
        <h3 className="font-semibold text-white">
          {userName || 'Usuario desconocido'}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <FiMapPin className="w-4 h-4" />
          <span>{place || "Remoto"}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceUserInfo;