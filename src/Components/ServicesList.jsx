import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";

/**
 * Lista de servicios con skeleton loader y modal de detalles
 */
const ServicesList = ({ services, loading }) => {
	const [selectedService, setSelectedService] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	// Estado de carga con skeleton
	if (loading) {
		return (
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
				<h3 className="text-2xl font-bold text-white mb-8">
					Servicios Destacados
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{Array.from({ length: 8 }, (_, i) => (
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
					Servicios Destacados
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
				Servicios Destacados
			</h3>

			{/* Grid de servicios */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{services.map((service) => (
					<ServiceCard
						key={service.id}
						service={service}
						onClick={() => handleServiceClick(service)}
					/>
				))}
			</div>

			{/* Modal de detalles */}
			{isModalOpen && selectedService && (
				<ServiceModal service={selectedService} onClose={closeModal} />
			)}
		</section>
	);
};

export default ServicesList;
