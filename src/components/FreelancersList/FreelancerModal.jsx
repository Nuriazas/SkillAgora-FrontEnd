import React from "react";
import {
  FiX,
  FiMapPin,
  FiStar,
  FiUser,
  FiDollarSign,
  FiMail,
  FiBriefcase,
} from "react-icons/fi";
import { useFreelancerModalLogic } from "../../hooks/freelancers/useFreelancerModal.js";
import FreelancerContactModal from "./FreelancerContactModal.jsx";
import FreelancerHireModal from "./FreelancerHireModal.jsx";
import FreelancerResultModal from "./FreelancerResultModal.jsx";
import DefaultAvatar from "../../assets/defaultAvatar.jpeg";
import { useTranslation } from "react-i18next";

/**
 * Modal para mostrar detalles completos de un freelancer
 * Estilo consistente con ServiceModal
 */
const FreelancerModal = ({ isOpen, onClose, freelancer }) => {
  const { t } = useTranslation();
  if (!isOpen || !freelancer) return null;

  const {
    // Estados
    isContactModalOpen,
    isHireModalOpen,
    isResultModalOpen,
    resultData,
    isProcessing,
    freelancerDetails,
    loadingDetails,

    // Setters
    setIsContactModalOpen,
    setIsHireModalOpen,
    setIsResultModalOpen,

    // Handlers
    handleContactFreelancer,
    handleSendMessage,
    handleHireFreelancer,
    handleConfirmHire,
  } = useFreelancerModalLogic(freelancer, onClose);

  // Mostrar loading si estamos cargando detalles
  if (loadingDetails) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full border border-gray-800/50 shadow-2xl p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <span className="ml-3 text-white">
              {t('freelancerModal.loadingDetails')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Usar freelancerDetails del hook, que puede tener datos más completos
  const details = freelancerDetails || freelancer;

  const {
    name = t('freelancerModal.anonymousUser'),
    avatar,
    specialty = t('freelancerModal.general'),
    location = t('freelancerModal.remote'),
    hourly_rate = 0,
    rating = 0,
    bio = "",
    experience = "",
    portfolio_url = "",
    language = t('freelancerModal.english'),
  } = details;

  const mockCoverImage =
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop";

  // Handlers ya están en el hook useFreelancerModalLogic
  const handleImageError = (e) => {
    e.target.src = DefaultAvatar;
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={(e) =>
          e.target === e.currentTarget &&
          !isContactModalOpen &&
          !isHireModalOpen &&
          !isResultModalOpen &&
          onClose()
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 shadow-2xl">
          {/* Header con imagen de portada */}
          <div className="relative">
            <img
              src={mockCoverImage}
              alt={`${name}'s cover`}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-t-2xl"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-gray-800/90 hover:bg-gray-700/90 p-2 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5 text-gray-300" />
            </button>

            {/* Avatar centrado */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <img
                src={avatar || DefaultAvatar}
                alt={t('avatar.profilePicture', { name })}
                className="w-32 h-32 rounded-full border-4 border-purple-500/50 object-cover shadow-2xl"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8 pt-20">
            {/* Info principal del freelancer */}
            <div className="text-center mb-6">
              <h2
                id="modal-title"
                className="text-2xl font-bold text-white mb-2"
              >
                {name}
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <FiUser className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 font-medium">{specialty}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <FiMapPin className="w-4 h-4" />
                <span>{location}</span>
                <span>•</span>
                <span>{language}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-400 mb-6 leading-relaxed text-center">
              {bio ||
                t('freelancerModal.defaultBio', { specialty: specialty.toLowerCase() })}
            </p>

            {/* Experience */}
            {experience && (
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <FiBriefcase className="w-4 h-4 text-purple-400" />
                  {t('freelancerModal.experience')}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {experience}
                </p>
              </div>
            )}

            {/* Grid de información */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                <div className="flex items-center space-x-2 mb-2">
                  <FiStar className="w-5 h-5 text-yellow-400" />
                  <span className="font-medium text-white text-sm">{t('freelancerModal.rating')}</span>
                </div>
                <span className="text-gray-400">
                  {Number(rating).toFixed(1)} / 5.0
                </span>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                <div className="flex items-center space-x-2 mb-2">
                  <FiDollarSign className="w-5 h-5 text-purple-400" />
                  <span className="font-medium text-white text-sm">
                    {t('freelancerModal.hourlyRate')}
                  </span>
                </div>
                <span className="text-gray-400">{t('freelancerModal.hourlyRateValue', { value: hourly_rate })}</span>
              </div>
            </div>

            {/* Portfolio link */}
            {portfolio_url && (
              <div className="mb-6">
                <a
                  href={portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  <FiBriefcase className="w-4 h-4" />
                  {t('freelancerModal.viewPortfolio')}
                </a>
              </div>
            )}

            {/* Footer con precio y botones */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t('freelancerModal.hourlyRateShort', { value: hourly_rate })}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleContactFreelancer}
                  className="px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-semibold border border-gray-600/50 flex items-center gap-2"
                >
                  <FiMail className="w-4 h-4" />
                  {t('freelancerModal.contact')}
                </button>
                <button
                  onClick={handleHireFreelancer}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-purple-500/25"
                >
                  {t('freelancerModal.hireFreelancer')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <FreelancerContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        freelancer={details}
        onSendMessage={handleSendMessage}
      />

      <FreelancerHireModal
        isOpen={isHireModalOpen}
        onClose={() => !isProcessing && setIsHireModalOpen(false)}
        freelancer={details}
        onConfirm={handleConfirmHire}
        loading={isProcessing}
      />

      <FreelancerResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        type={resultData.type}
        title={resultData.title}
        message={resultData.message}
        freelancerData={resultData.freelancerData}
      />
    </>
  );
};

export { FreelancerModal };
