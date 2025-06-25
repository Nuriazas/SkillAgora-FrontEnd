import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FreelancerCard } from "./FreelancerCard.jsx";
import { FreelancerModal } from "./FreelancerModal.jsx";
import { useTranslation } from "react-i18next";

/**
 * Lista de freelancers con skeleton loader y modal de detalles
 * Componente consistente con ServicesList para usar en la landing page
 */
const FreelancersList = ({ freelancers, loading, limit = null, showViewAll = false, isLandingPage = false }) => {
	const [selectedFreelancer, setSelectedFreelancer] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const { t } = useTranslation();

	// Handler para abrir modal de freelancer
	const handleFreelancerClick = (freelancer) => {
		console.log("Carta freelancer seleccionada:", freelancer);
		setSelectedFreelancer(freelancer);
		setIsModalOpen(true);
	};

	// Handler para cerrar modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedFreelancer(null);
	};

	console.log("🎭 Evaluando renderizado del modal:");
	console.log("  - isModalOpen:", isModalOpen);
	console.log("  - selectedFreelancer:", selectedFreelancer);
	console.log("  - Condición para renderizar:", isModalOpen && selectedFreelancer);
	console.log("  - Tipo de FreelancerModal:", typeof FreelancerModal);


	// Aplicar límite si se especifica
	const displayFreelancers = limit ? freelancers?.slice(0, limit) : freelancers;

	// Determinar clases de grid según el contexto
	const gridClasses = isLandingPage 
		? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
		: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

	// Estado de carga con skeleton
	if (loading) {
		const skeletonCount = limit || (isLandingPage ? 8 : 6);
		return (
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
				<h3 className="text-2xl font-bold text-white mb-8">
					{t('freelancerList.featured')}
				</h3>
				<div className={gridClasses}>
					{Array.from({ length: skeletonCount }, (_, i) => (
						<div
							key={i}
							className="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl border border-gray-800/50 overflow-hidden animate-pulse"
						>
							<div className="aspect-[4/3] bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
								<div className="w-32 h-32 rounded-full bg-gray-800"></div>
							</div>
							<div className="p-4">
								<div className="h-4 bg-gray-800 rounded mb-2"></div>
								<div className="h-3 bg-gray-800 rounded mb-2"></div>
								<div className="h-3 bg-gray-800 rounded mb-4"></div>
								<div className="flex justify-between">
									<div className="h-3 bg-gray-800 rounded w-16"></div>
									<div className="h-3 bg-gray-800 rounded w-12"></div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}

	// Estado sin freelancers
	if (!freelancers?.length) {
		return (
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
				<h3 className="text-2xl font-bold text-white mb-8">
					{t('freelancerList.all')}
				</h3>
				<div className="text-center py-12">
					<p className="text-gray-400">{t('freelancerList.noResults')}</p>
				</div>
			</section>
		);
	}

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
			<h3 className="text-2xl font-bold text-white mb-8">
				{limit ? t('freelancerList.featured') : t('freelancerList.all')}
			</h3>

			{/* Grid de freelancers */}
			<div className={gridClasses}>
				{displayFreelancers.map((freelancer) => (
					<FreelancerCard
						key={freelancer.id}
						freelancer={freelancer}
						onClick={() => handleFreelancerClick(freelancer)}
					/>
				))}
				
				{/* Carta de "Ver todos" si está habilitada */}
				{showViewAll && (
					<div
						onClick={() => navigate('/freelancers')}
						className="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl border border-gray-800/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer hover:-translate-y-2 group overflow-hidden flex items-center justify-center min-h-[300px]"
						role="button"
						tabIndex={0}
						aria-label={t('freelancerList.viewAll')}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								navigate('/freelancers');
							}
						}}
					>
						<div className="text-center p-6">
							<div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">👥</span>
							</div>
							<h4 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
								{t('freelancerList.viewAll')}
							</h4>
							<p className="text-sm text-gray-400">
								{t('freelancerList.discover')}
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Modal de detalles */}
			{isModalOpen && selectedFreelancer && (
				<FreelancerModal freelancer={selectedFreelancer} isOpen={isModalOpen} onClose={closeModal} />
			)}
		</section>
	);
};

export default FreelancersList;