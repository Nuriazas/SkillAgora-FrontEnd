import React from "react";
import { FiChevronLeft, FiChevronRight, FiStar, FiClock } from "react-icons/fi";
import { useTranslation } from "react-i18next";

/**
 * Carrusel de servicios destacados para el HeroSection
 */
const ServiceCarousel = ({
	service,
	services,
	currentIndex,
	onNext,
	onPrev,
	onGoTo,
	hasMultiple,
	onServiceClick,
}) => {
	const { t } = useTranslation();
	const limitedServices = services.slice(0, 5);
	const isCurrentIndexValid = currentIndex < limitedServices.length;
	const displayService = isCurrentIndexValid
		? limitedServices[currentIndex]
		: limitedServices[0];

	// Estado sin servicios
	if (!displayService) {
		return (
			<div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10 text-center">
				<div className="text-gray-500 mb-4">{t('serviceCarousel.noServices')}</div>
				<button className="text-purple-600 hover:text-purple-700 font-semibold">
					{t('serviceCarousel.reload')}
				</button>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10 transition-all duration-500">
			{/* Navegación del carrusel */}
			{limitedServices.length > 1 && (
				<>
					<button
						onClick={onPrev}
						className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-20"
						aria-label={t('serviceCarousel.prevService')}
					>
						<FiChevronLeft className="w-5 h-5 text-gray-600" />
					</button>
					<button
						onClick={onNext}
						className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-20"
						aria-label={t('serviceCarousel.nextService')}
					>
						<FiChevronRight className="w-5 h-5 text-gray-600" />
					</button>
				</>
			)}

			{/* Header con usuario y rating */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
						<span className="text-white font-bold text-sm">
							{displayService.user_name?.charAt(0) || t('serviceCarousel.defaultUserInitial')}
						</span>
					</div>
					<div>
						<div className="font-semibold text-gray-900">
							{displayService.user_name || t('serviceCarousel.anonymousUser')}
						</div>
						<div className="text-sm text-gray-500">
							{displayService.category_name}
						</div>
					</div>
				</div>
				<div className="text-right">
					<div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
						<FiStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
						<span>{displayService.rating || "5.0"}</span>
					</div>
					<div className="text-xl font-bold text-gray-900">
						${displayService.price}
					</div>
				</div>
			</div>

			{/* Contenido del servicio */}
			<div className="mb-6">
				<h3 className="text-xl font-bold text-gray-900 mb-3">
					{displayService.title}
				</h3>
				<p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
					{displayService.description}
				</p>

				<div className="space-y-2">
					<div className="flex items-center space-x-2 text-sm text-gray-500">
						<FiClock className="w-4 h-4" />
						<span>
							{t('serviceCarousel.delivery', { days: displayService.delivery_time_days || 3 })}
						</span>
					</div>
					<div className="flex items-center space-x-2 text-sm text-gray-500">
						<span className="w-4 h-4 flex items-center justify-center">📍</span>
						<span>{displayService.place || t('serviceCarousel.remote')}</span>
					</div>
				</div>
			</div>

			{/* Box de precio */}
			<div className="bg-gray-50 rounded-xl p-4 mb-6">
				<div className="flex justify-between items-center">
					<span className="font-semibold text-gray-900">
						{t('serviceCarousel.priceLabel')}
					</span>
					<span className="text-2xl font-bold text-purple-600">
						${displayService.price}
					</span>
				</div>
			</div>

			{/* CTA Button */}
			<button
				onClick={() => onServiceClick(displayService)}
				className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
			>
				{t('serviceCarousel.viewFullService')}
			</button>

			{/* Indicadores */}
			{limitedServices.length > 1 && (
				<div className="flex justify-center space-x-2 mt-6">
					{limitedServices.map((_, index) => (
						<button
							key={index}
							onClick={() => onGoTo(index)}
							className={`w-2 h-2 rounded-full transition-colors duration-200 ${
								index === currentIndex ? "bg-purple-600" : "bg-gray-300"
							}`}
							aria-label={t('serviceCarousel.goToService', { n: index + 1 })}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ServiceCarousel;
