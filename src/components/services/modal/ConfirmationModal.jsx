import React from "react";
import { useTranslation } from "react-i18next";

// Modal para confirmar la contratación de un servicio
const ConfirmationModal = ({	// Props del componente
	isOpen,
	onClose,
	service,
	onConfirm,
	loading,
}) => {
	const { t } = useTranslation();
	if (!isOpen) return null;

	return (	// Renderiza el modal
		<div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-gray-800/50 shadow-2xl">
				<div className="p-6 border-b border-gray-800/50">
					<h3 className="text-xl font-semibold text-white text-center">
						{t('confirmationModal.title')}
					</h3>
				</div>

				<div className="p-6">
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
							<span className="text-2xl">🛒</span>
						</div>
						<p className="text-gray-300 mb-4">
							{t('confirmationModal.question')}
						</p>
						<div className="bg-gray-800/50 rounded-xl p-4 mb-4">
							<h4 className="font-semibold text-white mb-2">{service.title}</h4>
							<div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
								{service.price_formatted || `$${service.price}`}
							</div>
						</div>
						<p className="text-sm text-gray-400">
							{t('confirmationModal.info')}
						</p>
					</div>

					<div className="flex gap-3">
						<button
							onClick={onClose}
							className="flex-1 px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-medium border border-gray-600/50"
							disabled={loading}
						>
							{t('confirmationModal.cancel')}
						</button>
						<button
							onClick={onConfirm}
							disabled={loading}
							className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-green-500/25"
						>
							{loading ? (
								<>
									<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									{t('confirmationModal.confirming')}
								</>
							) : (
								t('confirmationModal.confirm')
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;