import React from "react";

// Componente para mostrar el contenido del servicio
const ServiceContent = ({ title, description, categoryName }) => {
  return (
    <>
      <h2 id="modal-title" className="text-2xl font-bold text-white mb-4">
        {title || 'Servicio sin título'}
      </h2>
      {categoryName && (
        <div className="text-xs text-gray-400 font-semibold mb-1">
          {categoryName}
        </div>
      )}
      <p className="text-gray-400 mb-6 leading-relaxed">
        {description || 'Sin descripción disponible'}
      </p>
    </>
  );
};

export default ServiceContent;