import React, { useState } from "react";
import ServiceCarousel from "../services/list/ServiceCarousel.jsx";
import ServiceModal from "../services/modal/ServiceModal.jsx";
import useServiceCarousel from "../../hooks/services/useServiceCarousel.js";
import LandingNavigationButtons from "./LandingNavigationButtons.jsx";

// componente HeroSection que muestra el título, descripción y carousel de servicios

const HeroSection = () => {
	const [selectedService, setSelectedService] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Hook personalizado para manejar el carrusel de servicios
	const {
		services,
		currentService,
		currentIndex,
		loading,
		nextService,
		prevService,
		goToService,
		hasMultipleServices,
	} = useServiceCarousel(5); // Mostrar 5 servicios en el carrusel

	// Handler para abrir modal con detalles del servicio
	const handleServiceClick = (service) => {
		setSelectedService(service);
		setIsModalOpen(true);
	};

	// Handler para cerrar modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedService(null);
	};

	return (
		<>
			<section className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
						{/* Lado izquierdo - Contenido principal */}
						<div className="space-y-8">
							{/* Título y descripción */}
							<div className="space-y-6">
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
									Find the{" "}
									<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
										perfect talent
									</span>{" "}
									for your project
								</h1>

								<p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg">
									Connect with expert freelancers and take your ideas to the
									next level with the most trusted platform.
								</p>
							</div>

							{/* Botones de navegación */}
							<LandingNavigationButtons />

							{/* Estadísticas de la plataforma */}
							<div className="flex flex-wrap gap-8 pt-8">
								<div>
									<div className="text-2xl font-bold text-white">10,000+</div>
									<div className="text-sm text-gray-400">
										Completed Projects
									</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-white">5,000+</div>
									<div className="text-sm text-gray-400">
										Active Freelancers
									</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-white">98%</div>
									<div className="text-sm text-gray-400">Satisfaction Rate</div>
								</div>
							</div>
						</div>

						{/* Lado derecho - Carouse de servicios */}
						<div className="relative">
							{loading ? (
								/* Skeleton loader mientras cargan los servicios */
								<div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10 animate-pulse">
									<div className="h-6 bg-gray-200 rounded mb-4"></div>
									<div className="h-4 bg-gray-200 rounded mb-6"></div>
									<div className="space-y-3 mb-6">
										<div className="h-4 bg-gray-200 rounded"></div>
										<div className="h-4 bg-gray-200 rounded"></div>
										<div className="h-4 bg-gray-200 rounded"></div>
									</div>
									<div className="h-12 bg-gray-200 rounded"></div>
								</div>
							) : (
								/* Carrusel de servicios */
								<ServiceCarousel
									service={currentService}
									services={services}
									currentIndex={currentIndex}
									onNext={nextService}
									onPrev={prevService}
									onGoTo={goToService}
									onServiceClick={handleServiceClick}
									hasMultiple={hasMultipleServices}
								/>
							)}

							{/* Decoraciones de fondo */}
							<div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl"></div>
							<div className="absolute -bottom-4 -left-4 w-full h-full bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Modal de detalles del servicio */}
			{isModalOpen && selectedService && (
				<ServiceModal service={selectedService} onClose={closeModal} />
			)}
		</>
	);
};

export default HeroSection;
