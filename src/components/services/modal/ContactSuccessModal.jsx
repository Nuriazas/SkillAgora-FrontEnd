import React from "react";
import { useTranslation } from "react-i18next";

// Modal que muestra el mensaje de éxito al contactar al proveedor
const ContactSuccessModal = ({ isOpen, onClose, providerName }) => {
	const { t } = useTranslation();
	
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-gray-800/50 shadow-2xl">
				<div className="p-6 border-b border-gray-800/50">
					<h3 className="text-xl font-semibold text-white text-center">
						{t('contactSuccessModal.sent')}
					</h3>
				</div>

				<div className="p-6">
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
							<span className="text-2xl">✅</span>
						</div>
						<p className="text-gray-300 mb-4">
							{t('contactSuccessModal.success')}
						</p>
						<div className="bg-gray-800/50 rounded-xl p-4 mb-4">
							<h4 className="font-semibold text-white mb-2">{t('contactSuccessModal.sentTo')}:</h4>
							<div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
								{providerName}
							</div>
						</div>
						<p className="text-sm text-gray-400">
							{t('contactSuccessModal.notify', { name: providerName })}
						</p>
					</div>

					<button
						onClick={onClose}
						className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-green-500/25"
					>
						{t('contactSuccessModal.understood')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContactSuccessModal;