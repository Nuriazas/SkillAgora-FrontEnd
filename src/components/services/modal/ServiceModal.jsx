import React from "react";
import { useServiceModalLogic } from "../../../hooks/services/useServiceModal.js";
import ContactModal from "./ContactModal.jsx";
import ConfirmationModal from "./ConfirmationModal.jsx";
import ResultModal from "./ResultModal.jsx";
import ServiceHeader from "../components/ServiceHeader.jsx";
import ServiceUserInfo from "../components/ServiceUserInfo.jsx";
import ServiceContent from "../components/ServiceContent.jsx";
import ServiceStats from "../components/ServiceStats.jsx";
import ServiceFooter from "../components/ServiceFooter.jsx";
import { useTranslation } from "react-i18next";

/**
 * Modal para mostrar detalles completos de un servicio
 */
const ServiceModal = ({ service, onClose }) => {
  const { t } = useTranslation();
  
  const hookResult = useServiceModalLogic(service, onClose);
  
  if (!hookResult) {
    console.error('useServiceModalLogic returned undefined!');
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full border border-gray-800/50 shadow-2xl p-8">
          <div className="text-white text-center">
            <div className="text-red-400 mb-2">{t('serviceModal.error.loadingService')}</div>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    isContactModalOpen,
    isConfirmModalOpen,
    isResultModalOpen,
    resultData,
    isCreatingOrder,
    serviceDetails,
    loadingDetails,
    orderStatus,
    setIsContactModalOpen,
    setIsResultModalOpen,
    setIsConfirmModalOpen,
    handleContactSeller,
    handleSendMessage,
    handleHireService,
    handleConfirmHire,
    handleKeyDown,
  } = hookResult;

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

  if (!serviceDetails) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full border border-gray-800/50 shadow-2xl p-8">
          <div className="text-white text-center">
            <div className="text-red-400 mb-2">{t('serviceModal.error.noDetails')}</div>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              {t('common.close')}
            </button>
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
          <ServiceHeader 
            title={serviceDetails.title}
            service={service}
            onClose={onClose}
          />

          <div className="p-8">
            <ServiceUserInfo
              userName={serviceDetails.user_name}
              place={serviceDetails.place}
              avatar={serviceDetails.avatar}
            />

            <ServiceContent
              title={serviceDetails.title}
              description={serviceDetails.description}
              categoryName={service.category_name}
            />

            <ServiceStats
              deliveryTimeDays={serviceDetails.delivery_time_days}
              rating={serviceDetails.rating}
              reviews={serviceDetails.reviews}
              serviceId={serviceDetails.id}
            />

            <ServiceFooter
              price={serviceDetails.price}
              orderStatus={orderStatus}
              handleContactSeller={handleContactSeller}
              handleHireService={handleHireService}
            />
          </div>
        </div>
      </div>

      {/* Modales */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        service={serviceDetails}
        userId={serviceDetails?.id}
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