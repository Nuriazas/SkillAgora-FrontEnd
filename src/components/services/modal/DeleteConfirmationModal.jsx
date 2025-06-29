import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, loading, serviceName }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[80]">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-gray-800/50 shadow-2xl">
        <div className="p-6 border-b border-gray-800/50">
          <h3 className="text-xl font-semibold text-white text-center">
            {t('deleteModal.title') || 'Confirmar Eliminación'}
          </h3>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTrash2 className="text-2xl text-white" />
            </div>
            <p className="text-gray-300 mb-4">
              {t('deleteModal.warning') || '¿Estás seguro de que quieres eliminar este servicio?'}
            </p>
            <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-white mb-2">
                {t('deleteModal.serviceName') || 'Servicio:'}
              </h4>
              <div className="text-lg font-bold text-white">
                {serviceName}
              </div>
            </div>
            <p className="text-sm text-gray-400 font-medium">
              {t('deleteModal.permanent') || 'Esta acción es irreversible'}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-medium border border-gray-600/50"
              disabled={loading}
            >
              {t('deleteModal.cancel') || 'Cancelar'}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t('deleteModal.deleting') || 'Eliminando...'}
                </>
              ) : (
                <>
                  <FiTrash2 className="w-4 h-4" />
                  {t('deleteModal.confirm') || 'Eliminar'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;