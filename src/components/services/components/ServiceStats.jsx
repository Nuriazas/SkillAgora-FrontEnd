import React from "react";
import { FiClock, FiStar } from "react-icons/fi";

// Componente ServiceStats para mostrar estadísticas del servicio
const ServiceStats = ({ deliveryTimeDays, rating, reviews }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
        <div className="flex items-center space-x-2 mb-2">
          <FiClock className="w-5 h-5 text-purple-400" />
          <span className="font-medium text-white text-sm">
            Tiempo de entrega
          </span>
        </div>
        <span className="text-gray-400">
          {deliveryTimeDays || "3"} días
        </span>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
        <div className="flex items-center space-x-2 mb-2">
          <FiStar className="w-5 h-5 text-yellow-400" />
          <span className="font-medium text-white text-sm">
            Valoración
          </span>
        </div>
        <span className="text-gray-400">
          {rating || "5.0"} (
          {reviews || "0"} reseñas)
        </span>
      </div>
    </div>
  );
};

export default ServiceStats;