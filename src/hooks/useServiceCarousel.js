import { useState, useEffect } from "react";
import { servicesApi } from "../services/api/api";

/**
 * Hook personalizado para manejar el carrusel de servicios destacados
 * @param {number} limit - Número máximo de servicios a cargar
 * @returns {Object} Estado y funciones del carrusel
 */
const useServiceCarousel = (limit = 5) => {
	const [services, setServices] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		loadServices();
	}, [limit]);

	// Cargar servicios destacados
	const loadServices = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await servicesApi.getFeaturedServices(limit);
			setServices(response.data || []);
			setCurrentIndex(0); // Reset al primer servicio
		} catch (error) {
			console.error("Error loading services:", error);
			setError(error.message || "Error al cargar servicios");
			setServices([]);
		} finally {
			setLoading(false);
		}
	};

	// Ir al siguiente servicio
	const nextService = () => {
		const maxServices = Math.min(services.length, limit);
		if (maxServices > 0) {
			setCurrentIndex((prev) => (prev + 1) % maxServices);
		}
	};

	// Ir al servicio anterior
	const prevService = () => {
		const maxServices = Math.min(services.length, limit);
		if (maxServices > 0) {
			setCurrentIndex((prev) => (prev - 1 + maxServices) % maxServices);
		}
	};

	// Ir a un servicio específico
	const goToService = (index) => {
		const maxServices = Math.min(services.length, limit);
		if (index >= 0 && index < maxServices) {
			setCurrentIndex(index);
		}
	};

	const currentService = services[currentIndex] || null;

	return {
		services,
		currentService,
		currentIndex,
		loading,
		error,
		nextService,
		prevService,
		goToService,
		hasMultipleServices: Math.min(services.length, limit) > 1,
		retry: loadServices,
	};
};

export default useServiceCarousel;
