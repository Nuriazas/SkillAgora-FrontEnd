import React from "react";

// Componente para el botón de acción del servicio
const ServiceActionButton = ({ orderStatus, handleHireService }) => {
  if (!orderStatus) {
    return (
      <button
        onClick={handleHireService}
        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25"
      >
        Contratar Servicio
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
        Verificando...
      </button>
    );
  }

  if (orderStatus.hasActiveOrder) {
    const statusLabels = {
      pending: "Pendiente",
      accepted: "Aceptada", 
      in_progress: "En Progreso"
    };

    return (
      <div className="px-8 py-3 bg-yellow-600/80 text-white rounded-xl font-semibold text-center">
        <div className="text-sm">Ya contratado</div>
        <div className="text-xs opacity-80">
          Estado: {statusLabels[orderStatus.orderStatus] || orderStatus.orderStatus}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleHireService}
      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25"
    >
      Contratar Servicio
    </button>
  );
};

export default ServiceActionButton;