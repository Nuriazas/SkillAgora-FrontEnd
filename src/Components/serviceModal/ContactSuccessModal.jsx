import React from "react";

/**
 * Modal de éxito para contacto enviado
 */
const ContactSuccessModal = ({ isOpen, onClose, providerName }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-gray-800/50 shadow-2xl">
				{/* Header */}
				<div className="p-6 border-b border-gray-800/50">
					<h3 className="text-xl font-semibold text-white text-center">
						¡Mensaje Enviado!
					</h3>
				</div>

				{/* Content */}
				<div className="p-6">
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
							<span className="text-2xl">✅</span>
						</div>
						<p className="text-gray-300 mb-4">
							Tu solicitud de contacto ha sido enviada exitosamente
						</p>
						<div className="bg-gray-800/50 rounded-xl p-4 mb-4">
							<h4 className="font-semibold text-white mb-2">Enviado a:</h4>
							<div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
								{providerName}
							</div>
						</div>
						<p className="text-sm text-gray-400">
							Recibirás una notificación cuando {providerName} responda a tu
							mensaje.
						</p>
					</div>

					{/* Button */}
					<button
						onClick={onClose}
						className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-green-500/25"
					>
						Entendido
					</button>
				</div>
			</div>
		</div>
	);
};

export default ContactSuccessModal;
