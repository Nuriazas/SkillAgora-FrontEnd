import React from "react";
import { FiFilter, FiX } from "react-icons/fi";
import { PRICE_RANGES, SORT_OPTIONS } from "../../constants/filterOptions.js";
import { useTranslation } from "react-i18next";

// Componente para los controles de los filtros y ordenamiento

const FilterControls = ({		// Props del componente
	filters,
	categories,
	onFilterChange,
	onSortChange,
	onClearFilters,
	hasActiveFilters,
}) => {
	const { t } = useTranslation();

	// Handler para el cambio de rango de precios
	const handlePriceRangeChange = (value) => {
		if (value === "") {
			// Limpiar filtros de precio
			onFilterChange("minPrice", "");
			onFilterChange("maxPrice", "");
		} else if (value === "200-") {
			// Precio mínimo sin máximo
			onFilterChange("minPrice", "200");
			onFilterChange("maxPrice", "");
		} else {
			// Rango específico
			const [min, max] = value.split("-");
			onFilterChange("minPrice", min);
			onFilterChange("maxPrice", max);
		}
	};

	return (
		<div className="flex gap-3 flex-wrap">
			{/* Filtro de Categorías */}
			<select
				value={filters.category || ""}
				onChange={(e) => onFilterChange("category", e.target.value)}
				className="px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none text-white backdrop-blur-sm min-w-[150px]"
				aria-label={t('filterControls.filterByCategory')}
			>
				<option value="">{t('filterControls.allCategories')}</option>
				{categories?.map((category) => (
					<option key={category.id} value={category.name}>
						{category.name}
					</option>
				))}
			</select>

			{/* Filtro de Precio */}
			<select
				value={filters.priceRange || ""}
				onChange={(e) => handlePriceRangeChange(e.target.value)}
				className="px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none text-white backdrop-blur-sm min-w-[120px]"
				aria-label={t('filterControls.filterByPrice')}
			>
				{PRICE_RANGES.map((range) => (
					<option key={range.value} value={range.value}>
						{t(`filterControls.priceRange.${range.value}`, { defaultValue: range.label })}
					</option>
				))}
			</select>

			{/* Filtro de Ordenamiento */}
			<select
				value={`${filters.orderBy || "created_at"}-${
					filters.orderDirection || "DESC"
				}`}
				onChange={(e) => onSortChange(e.target.value)}
				className="px-4 py-3 bg-gray-800/80 border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none text-white backdrop-blur-sm min-w-[160px]"
				aria-label={t('filterControls.sortResults')}
			>
				{SORT_OPTIONS.map((option) => (
					<option key={option.value} value={option.value}>
						{t(`filterControls.sortOptions.${option.value}`, { defaultValue: option.label })}
					</option>
				))}
			</select>

			{/* Botón de Aplicar Filtros */}
			<button
				type="submit"
				className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
				aria-label={t('filterControls.applyFilters')}
				title={t('filterControls.applyFilters')}
			>
				<FiFilter className="w-5 h-5" />
			</button>

			{/* Botón de Limpiar Filtros */}
			{hasActiveFilters && (
				<button
					type="button"
					onClick={onClearFilters}
					className="px-4 py-3 bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-xl transition-all duration-200 border border-gray-600/50 hover:border-gray-500/50"
					title={t('filterControls.clearFilters')}
					aria-label={t('filterControls.clearAllFilters')}
				>
					<FiX className="w-5 h-5" />
				</button>
			)}
		</div>
	);
};

export default FilterControls;
