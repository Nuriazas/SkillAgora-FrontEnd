import { useState, useEffect } from "react";
import { servicesApi } from "../../services/api/api.js";

/**
 * Hook personalizado para manejar filtros y búsqueda de servicios
 * Combina filtros del backend con búsqueda del frontend
 */
const useServiceFilters = () => {
	const [allServices, setAllServices] = useState([]);
	const [filteredServices, setFilteredServices] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filters, setFilters] = useState({
		search: "",
		category: "",
		place: "",
		minPrice: "",
		maxPrice: "",
		orderBy: "created_at",
		orderDirection: "DESC",
	});

	useEffect(() => {
		loadServices();
	}, [filters]);

	// Cargar servicios según filtros activos
	const loadServices = async () => {
		try {
			setLoading(true);
			let response;

			if (filters.search) {
				// Con búsqueda: obtener todos y filtrar en frontend
				response = await servicesApi.getAllServices();
				let filtered = applySearchFilter(response.data, filters.search);
				filtered = applyOtherFilters(filtered, filters);
				setFilteredServices(filtered);
			} else {
				// Sin búsqueda: usar filtros del backend
				const backendFilters = {
					category: filters.category,
					place: filters.place,
					minPrice: filters.minPrice,
					maxPrice: filters.maxPrice,
					orderBy: filters.orderBy,
					orderDirection: filters.orderDirection,
				};

				response = await servicesApi.getFilteredServices(backendFilters);
				setFilteredServices(response.data);
			}

			setAllServices(response.data);
		} catch (error) {
			console.error("Error loading services:", error);
			setFilteredServices([]);
		} finally {
			setLoading(false);
		}
	};

	// Filtrar servicios por término de búsqueda
	const applySearchFilter = (services, searchTerm) => {
		const term = searchTerm.toLowerCase().trim();
		if (!term) return services;

		return services.filter(
			(service) =>
				service.title?.toLowerCase().includes(term) ||
				service.description?.toLowerCase().includes(term) ||
				service.category_name?.toLowerCase().includes(term) ||
				service.user_name?.toLowerCase().includes(term)
		);
	};

	// Aplicar filtros adicionales (categoría, precio, lugar)
	const applyOtherFilters = (services, filters) => {
		let filtered = [...services];

		// Filtro por categoría
		if (filters.category) {
			filtered = filtered.filter(
				(service) => service.category_id == filters.category
			);
		}

		// Filtro por lugar
		if (filters.place) {
			filtered = filtered.filter((service) =>
				service.place?.toLowerCase().includes(filters.place.toLowerCase())
			);
		}

		// Filtro por precio mínimo
		if (filters.minPrice) {
			const minPrice = parseFloat(filters.minPrice);
			filtered = filtered.filter((service) => service.price >= minPrice);
		}

		// Filtro por precio máximo
		if (filters.maxPrice) {
			const maxPrice = parseFloat(filters.maxPrice);
			filtered = filtered.filter((service) => service.price <= maxPrice);
		}

		// Ordenación
		filtered.sort((a, b) => {
			const aValue = a[filters.orderBy];
			const bValue = b[filters.orderBy];

			if (filters.orderDirection === "ASC") {
				return aValue > bValue ? 1 : -1;
			} else {
				return aValue < bValue ? 1 : -1;
			}
		});

		return filtered;
	};

	// Actualizar filtros
	const handleFiltersChange = (newFilters) => {
		setFilters((prev) => ({
			...prev,
			...newFilters,
		}));
	};

	// Manejar búsqueda
	const handleSearch = (searchTerm) => {
		setFilters((prev) => ({
			...prev,
			search: searchTerm,
		}));
	};

	// Limpiar todos los filtros
	const clearFilters = () => {
		setFilters({
			search: "",
			category: "",
			place: "",
			minPrice: "",
			maxPrice: "",
			orderBy: "created_at",
			orderDirection: "DESC",
		});
	};

	return {
		allServices,
		filteredServices,
		filters,
		loading,
		handleFiltersChange,
		handleSearch,
		clearFilters,
	};
};

export default useServiceFilters;
