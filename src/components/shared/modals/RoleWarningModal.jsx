import React from "react";
import { useTranslation } from "react-i18next";

const RoleWarningModal = ({ open, onClose }) => {
  const { t } = useTranslation();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">
            {t('roleWarningModal.title')}
          </h3>
          <p className="text-gray-300 mb-6">
            {t('roleWarningModal.description')}
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {t('roleWarningModal.understood')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleWarningModal; 