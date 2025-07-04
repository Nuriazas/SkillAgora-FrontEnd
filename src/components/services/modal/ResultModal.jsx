import React from "react";
import { useTranslation } from "react-i18next";

// Modal para mostrar el resultado de una acción (éxito o error)
const ResultModal = ({ isOpen, onClose, type, title, message, orderData }) => {
	const { t } = useTranslation();
	if (!isOpen) return null;

	const isSuccess = type === "success";
	return (
		
		<div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-gray-800/50 shadow-2xl">
				<div className="p-6 border-b border-gray-800/50">
					<h3 className="text-xl font-semibold text-white text-center">
						{title}
					</h3>
				</div>

				<div className="p-6 text-center">
					<div
						className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
							isSuccess
								? "bg-gradient-to-r from-green-600 to-emerald-600"
								: "bg-gradient-to-r from-red-600 to-rose-600"
						}`}
					>
						<span className="text-2xl">{isSuccess ? "✅" : "❌"}</span>
					</div>

					<p className="text-gray-300 mb-4">{message}</p>

					{isSuccess && orderData && (
						<div className="bg-gray-800/50 rounded-xl p-4 mb-4">
							<div className="text-sm text-gray-400 mb-2">
								{t('resultModal.orderDetails')}
							</div>
							<div className="text-white font-semibold">
								{t('resultModal.id')}: #{orderData.id}
							</div>
							<div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
								{t('resultModal.total')}: ${orderData.total_price}
							</div>
							<div className="text-xs text-gray-500 mt-2">
								{t('resultModal.status')}: {orderData.status || t('resultModal.pending')}
							</div>
						</div>
					)}

					<button
						onClick={onClose}
						className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-green-500/25"
					>
						{t('resultModal.understood')}
					</button>
				</div>
			</div>
		</div>
	);
	
};

export default ResultModal;