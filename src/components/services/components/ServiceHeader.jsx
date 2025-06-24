import React from "react";
import { FiX } from "react-icons/fi";

// Componente ServiceHeader para mostrar la cabecera del servicio
const ServiceHeader = ({ title, onClose }) => {
  const mockImage =
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop";

  return (
    <div className="relative">
      <img
        src={mockImage}
        alt={title || 'Servicio'}
        className="w-full h-64 object-cover rounded-t-2xl"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-t-2xl"></div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-gray-800/90 hover:bg-gray-700/90 p-2 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Cerrar modal"
      >
        <FiX className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );
};

export default ServiceHeader;