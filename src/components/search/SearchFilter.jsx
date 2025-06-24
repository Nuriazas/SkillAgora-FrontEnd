import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import FilterControls from "./FIlterControls.jsx"; // Fixed import typo

// Componente para búsqueda y filtros de servicios
const SearchFilter = ({	// Props del componente
	onFiltersChange,
	onSearch,
	categories,
	filters,
	onClearFilters,
}) => {
	// Estado local para la búsqueda (permite typing sin disparar búsquedas constantes)
	const [localSearch, setLocalSearch] = useState(filters.search || "");

	// Sincronizar estado local con filtros externos
	useEffect(() => {
		setLocalSearch(filters.search || "");
	}, [filters.search]);

	// Handler para envío del formulario de búsqueda
	const handleSearchSubmit = (e) => {
		e.preventDefault();
		onSearch(localSearch.trim()); // Trim para evitar búsquedas con solo espacios
	};

	// Handler para cambios en filtros individuales
	const handleFilterChange = (filterType, value) => {
		onFiltersChange({ [filterType]: value });	// Actualiza el filtro segun el valor recibido
	};

	// Handler para cambios en el ordenamiento
	const handleSortChange = (value) => {	// value es un string como "created_at-DESC" o "price-ASC"
		const [orderBy, orderDirection] = value.split("-");	// Divide el string en dos partes: ordenamiento y dirección
		onFiltersChange({ orderBy, orderDirection });	// Actualiza los filtros con el nuevo ordenamiento
	};

	// Handler para limpiar todos los filtros
	const handleClearFilters = () => {
		setLocalSearch("");
		onClearFilters();
	};

	// Handler para cambios en el input de búsqueda
	const handleSearchInputChange = (e) => {
		setLocalSearch(e.target.value);
	};

	// Determinar si hay filtros activos para mostrar el botón de limpiar
	const hasActiveFilters =
		filters.search ||
		filters.category ||
		filters.minPrice ||
		filters.maxPrice ||
		(filters.orderBy && filters.orderBy !== "created_at") ||
		(filters.orderDirection && filters.orderDirection !== "DESC");

	return (	// Renderiza el componente de búsqueda y filtros
		<section
			className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
			aria-label="Búsqueda y filtros de servicios"
		>
			<div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800/50 p-6">
				{/* Formulario de búsqueda */}
				<form
					onSubmit={handleSearchSubmit}
					className="flex flex-col lg:flex-row gap-4"
					role="search"
				>
					{/* Campo de búsqueda */}
					<div className="flex-1 relative">
						<FiSearch
							className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
							aria-hidden="true"
						/>
						<input
							type="text"
							placeholder="¿Qué servicio necesitas?"
							value={localSearch}
							onChange={handleSearchInputChange}
							className="w-full pl-12 pr-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none text-white placeholder-gray-400 backdrop-blur-sm"
							aria-label="Buscar servicios"
							autoComplete="off"
						/>
					</div>

					{/* Controles de filtrado */}
					<FilterControls
						filters={filters}
						categories={categories}
						onFilterChange={handleFilterChange}
						onSortChange={handleSortChange}
						onClearFilters={handleClearFilters}
						hasActiveFilters={hasActiveFilters}
					/>
				</form>
			</div>
		</section>
	);
};

export default SearchFilter;
