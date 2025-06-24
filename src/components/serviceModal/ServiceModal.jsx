import React from "react";
import { FiX, FiMapPin, FiClock, FiStar } from "react-icons/fi";
import { useServiceModalLogic } from "../../hooks/useServiceModalLogic.js";
import ContactModal from "./ContactModal.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import ResultModal from "./ResultModal.jsx";
import DefaultAvatar from "../../assets/defaultAvatar.jpeg";
import CreateReviewForm from "../notification/CreateReviewForm.jsx";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

/**
 * Modal para mostrar detalles completos de un servicio
 */
const ServiceModal = ({ service, onClose }) => {
  const navigate = useNavigate();

  const {
    // Estados
    isContactModalOpen,
    isConfirmModalOpen,
    isResultModalOpen,
    resultData,
    isCreatingOrder,
    serviceDetails,
    loadingDetails,

    // Setters
    setIsContactModalOpen,
    setIsResultModalOpen,
    setIsConfirmModalOpen,

    // Handlers
    handleContactSeller,
    handleSendMessage,
    handleHireService,
    handleConfirmHire,
    handleKeyDown,
  } = useServiceModalLogic(service, onClose);

  const { t } = useTranslation();

  const mockImage =
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop";
  const mockAvatar =
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face";

  // Mostrar loading si estamos cargando detalles
  if (loadingDetails) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full border border-gray-800/50 shadow-2xl p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <span className="ml-3 text-white">
              {t("serviceModal.loadingDetails")}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={(e) =>
          e.target === e.currentTarget &&
          !isContactModalOpen &&
          !isConfirmModalOpen &&
          !isResultModalOpen &&
          onClose()
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 shadow-2xl">
          {/* Header con imagen */}
          <div className="relative">
            <img
              src={mockImage}
              alt={t("serviceModal.serviceImageAlt", {
                title: serviceDetails.title,
              })}
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

          {/* Contenido */}
          <div className="p-8">
            {/* Info del usuario */}
            <div className="flex items-center space-x-3 mb-6">
              <img
                src={serviceDetails.avatar || DefaultAvatar}
                alt={t("avatar.profilePicture", {
                  name: serviceDetails.user_name,
                })}
                className="w-12 h-12 rounded-full border-2 border-purple-500/50"
                onError={(e) => {
                  e.target.onerror = null; // previene loop infinito
                  e.target.src = DefaultAvatar;
                }}
              />

              <div>
                <h3 className="font-semibold text-white">
                  {serviceDetails.user_name}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <FiMapPin className="w-4 h-4" />
                  <span>
                    {serviceDetails.place || t("serviceModal.remote")}
                  </span>
                </div>
              </div>
            </div>

            {/* Título y descripción */}
            <h2 id="modal-title" className="text-2xl font-bold text-white mb-4">
              {serviceDetails.title}
            </h2>
            {service.category_name && (
              <div className="text-xs text-gray-400 font-semibold mb-1">
                {service.category_name}
              </div>
            )}

            <p className="text-gray-400 mb-6 leading-relaxed">
              {serviceDetails.description}
            </p>

            {/* Grid de información */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                <div className="flex items-center space-x-2 mb-2">
                  <FiClock className="w-5 h-5 text-purple-400" />
                  <span className="font-medium text-white text-sm">
                    {t("serviceModal.deliveryTime")}
                  </span>
                </div>
                <span className="text-gray-400">
                  {serviceDetails.delivery_time_days || "3"}{" "}
                  {t("serviceModal.days")}
                </span>
              </div>
              <div
                onClick={() => navigate(`/review/${serviceDetails.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/review/${serviceDetails.id}`);
                  }
                }}
                className="cursor-pointer bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30"
                aria-label="Valorar servicio"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <FiStar className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium text-white text-sm">
                    {t("serviceModal.rating")}
                  </span>
                </div>
                <span className="text-gray-400">
                  {serviceDetails.rating || "5.0"} (
                  {serviceDetails.reviews || "0"} {t("serviceModal.reviews")})
                </span>
              </div>
            </div>

            {/* Footer con precio y botones */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ${serviceDetails.price}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleContactSeller}
                  className="px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-semibold border border-gray-600/50"
                >
                  {t("serviceModal.contact")}
                </button>
                <button
                  onClick={handleHireService}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25"
                >
                  {t("serviceModal.hireService")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        service={serviceDetails}
        onSendMessage={handleSendMessage}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => !isCreatingOrder && setIsConfirmModalOpen(false)}
        service={serviceDetails}
        onConfirm={handleConfirmHire}
        loading={isCreatingOrder}
      />

      <ResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        onKeyDown={handleKeyDown}
        type={resultData.type}
        title={resultData.title}
        message={resultData.message}
        orderData={resultData.orderData}
      />
    </>
  );
};

export default ServiceModal;
