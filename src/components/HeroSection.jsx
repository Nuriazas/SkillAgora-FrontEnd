import React, { useState } from "react";
import ServiceCarousel from "./ServiceCarousel.jsx";
import ServiceModal from "./serviceModal/ServiceModal.jsx";
import useServiceCarousel from "../hooks/useServiceCarousel.js";

/**
 * Componente HeroSection - Sección principal de la landing page
 * Incluye el mensaje principal, estadísticas, CTAs y carrusel de servicios destacados
 */
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

	// Handlers para los botones CTA
	const handleExploreServices = () => {
		// TODO: Implementar navegación a página de servicios
		console.log("Navegar a servicios");
	};

	const handleBecomeFreelancer = () => {
		// TODO: Implementar navegación a registro de freelancer
		console.log("Navegar a registro freelancer");
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
									Encuentra el{" "}
									<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
										talento perfecto
									</span>{" "}
									para tu proyecto
								</h1>

								<p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg">
									Conecta with freelancers expertos y lleva tus ideas al
									siguiente nivel con la plataforma más confiable.
								</p>
							</div>

							{/* Botones de Call-to-Action */}
							<div className="flex flex-col sm:flex-row gap-4">
								<button
									className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
									onClick={handleExploreServices}
									aria-label="Explorar servicios disponibles"
								>
									Explorar Servicios
								</button>
								<button
									className="border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:bg-gray-800/50"
									onClick={handleBecomeFreelancer}
									aria-label="Registrarse como freelancer"
								>
									Ser Freelancer
								</button>
							</div>

							{/* Estadísticas de la plataforma */}
							<div className="flex flex-wrap gap-8 pt-8">
								<div>
									<div className="text-2xl font-bold text-white">10,000+</div>
									<div className="text-sm text-gray-400">
										Proyectos completados
									</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-white">5,000+</div>
									<div className="text-sm text-gray-400">
										Freelancers activos
									</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-white">98%</div>
									<div className="text-sm text-gray-400">Satisfacción</div>
								</div>
							</div>
						</div>

						{/* Lado derecho - Carrusel de servicios */}
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
