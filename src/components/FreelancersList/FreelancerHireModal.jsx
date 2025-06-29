import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Modal de confirmación para contratar freelancer
 */
const FreelancerHireModal = ({
	isOpen,
	onClose,
	freelancer,
	onConfirm,
	loading,
}) => {
	const { t } = useTranslation();
	if (!isOpen || !freelancer) return null;

	return (
		<div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">
			<div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl max-w-md w-full border border-gray-800/50 shadow-2xl">
				{/* Header */}
				<div className="p-6 border-b border-gray-800/50">
					<h3 className="text-xl font-semibold text-white text-center">
						{t('freelancerHireModal.title')}
					</h3>
				</div>

				{/* Content */}
				<div className="p-6">
					<div className="text-center mb-6">
						<div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
							<span className="text-2xl">��</span>
						</div>
						<p className="text-gray-300 mb-4">
							{t('freelancerHireModal.confirmQuestion')}
						</p>
						<div className="bg-gray-800/50 rounded-xl p-4 mb-4">
							<div className="flex items-center gap-3 mb-2">
								<img
									src={freelancer.avatar}
									alt={freelancer.name}
									className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
								/>
								<div className="text-left">
									<h4 className="font-semibold text-white">
										{freelancer.name}
									</h4>
									<p className="text-sm text-gray-400">
										{freelancer.specialty}
									</p>
								</div>
							</div>
							<div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
								{freelancer.hourly_rate_formatted || t('freelancerHireModal.pricePerHour', { price: freelancer.hourly_rate })}
							</div>
						</div>
						<p className="text-sm text-gray-400">
							{t('freelancerHireModal.discuss', { name: freelancer.name })}
						</p>
					</div>

					{/* Buttons */}
					<div className="flex gap-3">
						<button
							onClick={onClose}
							className="flex-1 px-6 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 font-medium border border-gray-600/50"
							disabled={loading}
						>
							{t('freelancerHireModal.cancel')}
						</button>
						<button
							onClick={onConfirm}
							disabled={loading}
							className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-2"
						>
							{loading ? (
								<>
									<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									{t('freelancerHireModal.hiring')}
								</>
							) : (
								t('freelancerHireModal.confirmHire')
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FreelancerHireModal;
