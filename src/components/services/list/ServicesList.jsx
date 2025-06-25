import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../../services/list/ServiceCard.jsx";
import ServiceModal from "../modal/ServiceModal.jsx";

// lista de servicios con paginación y modal
const ServicesList = ({ services, loading, limit = null, showViewAll = false, isLandingPage = false }) => {
	const [selectedService, setSelectedService] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	console.log("SERVICES RECIBIDOS EN ServicesList:", services);

	// Handler para abrir modal de servicio
	const handleServiceClick = (service) => {
		setSelectedService(service);
		setIsModalOpen(true);
	};

	// Handler para cerrar modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedService(null);
	};

	// Aplicar límite si se especifica
	const displayServices = limit ? services?.slice(0, limit) : services;

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
					Servicios Destacados
				</h3>
				<div className={gridClasses}>
					{Array.from({ length: skeletonCount }, (_, i) => (
						<div
							key={i}
							className="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl border border-gray-800/50 overflow-hidden animate-pulse"
						>
							<div className="aspect-[4/3] bg-gray-800"></div>
							<div className="p-4">
								<div className="h-4 bg-gray-800 rounded mb-2"></div>
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

	// Estado sin servicios
	if (!services?.length) {
		return (
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
				<h3 className="text-2xl font-bold text-white mb-8">
					Todos los Servicios
				</h3>
				<div className="text-center py-12">
					<p className="text-gray-400">No se encontraron servicios</p>
				</div>
			</section>
		);
	}

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
			<h3 className="text-2xl font-bold text-white mb-8">
				{limit ? "Servicios Destacados" : "Todos los Servicios"}
			</h3>

			{/* Grid de servicios */}
			<div className={gridClasses}>
				{displayServices.map((service) => (
					<ServiceCard
						key={service.id}
						service={service}
						onClick={() => handleServiceClick(service)}
					/>
				))}
				
				{/* Carta de "Ver todos" si está habilitada */}
				{showViewAll && (
					<div
						onClick={() => navigate('/services')}
						className="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl border border-gray-800/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer hover:-translate-y-2 group overflow-hidden flex items-center justify-center min-h-[300px]"
						role="button"
						tabIndex={0}
						aria-label="Ver todos los servicios"
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								navigate('/services');
							}
						}}
					>
						<div className="text-center p-6">
							<div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
								<span className="text-2xl">📋</span>
							</div>
							<h4 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
								Ver Todos los Servicios
							</h4>
							<p className="text-sm text-gray-400">
								Explora nuestra colección completa de servicios
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Modal de detalles */}
			{isModalOpen && selectedService && (
				<ServiceModal service={selectedService} onClose={closeModal} />
			)}
		</section>
	);
};

export default ServicesList;