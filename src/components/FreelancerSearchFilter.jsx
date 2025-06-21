import React, { useState } from "react";

const FreelancerSearchFilter = ({
	onFiltersChange,
	onSearch,
	onClearFilters,
	filters,
}) => {
	const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

	const handleInputChange = (field, value) => {
		const newFilters = { ...filters, [field]: value };
		onFiltersChange(newFilters);
	};

	const handleSearchChange = (value) => {
		handleInputChange('search', value);
		onSearch(value);
	};

	const clearAllFilters = () => {
		setShowAdvancedFilters(false);
		onClearFilters();
	};

	return (
		<section className="py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto">
				{/* Contenedor principal de filtros */}
				<div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6 mb-6">
					
					{/* Filtros principales */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
						{/* Búsqueda */}
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Search Freelancers
							</label>
							<input
								type="text"
								placeholder="Search by name, bio, location..."
								value={filters.search || ''}
								onChange={(e) => handleSearchChange(e.target.value)}
								className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							/>
						</div>

						{/* Sort By */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Sort By
							</label>
							<select
								value={filters.sortBy || 'rating'}
								onChange={(e) => handleInputChange('sortBy', e.target.value)}
								className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
							>
								<option value="rating">Best Rating</option>
								<option value="price">Average Price</option>
								<option value="services">Most Services</option>
								<option value="reviews">Most Reviews</option>
								<option value="recent">Most Recent</option>
								<option value="name">Name A-Z</option>
							</select>
						</div>
					</div>

					{/* Toggle para filtros avanzados */}
					<div className="flex justify-between items-center">
						<button
							onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
							className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
						>
							{showAdvancedFilters ? "Hide" : "Show"} Advanced Filters
						</button>
					</div>

					{/* Filtros avanzados */}
					{showAdvancedFilters && (
						<div className="mt-6 pt-6 border-t border-gray-800/50">
							<h3 className="text-lg font-semibold text-white mb-4">Advanced Filters</h3>
							
							<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
								{/* Filter by Rating */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Rating  
									</label>
									<select
										value={filters.minRating || ''}
										onChange={(e) => handleInputChange('minRating', e.target.value)}
										className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									>
										<option value="">All Ratings</option>
										<option value="5">5 Stars</option>
										<option value="4">4+ Stars</option>
										<option value="3">3+ Stars</option>
										<option value="2">2+ Stars</option>
										<option value="1">1+ Stars</option>
									</select>
								</div>

								{/* Precio mínimo */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Min Price ($)
									</label>
									<input
										type="number"
										placeholder="0"
										value={filters.minPrice || ''}
										onChange={(e) => handleInputChange('minPrice', e.target.value)}
										className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									/>
								</div>

								{/* Precio máximo */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Max Price ($)
									</label>
									<input
										type="number"
										placeholder="1000"
										value={filters.maxPrice || ''}
										onChange={(e) => handleInputChange('maxPrice', e.target.value)}
										className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									/>
								</div>

								{/* Mínimo de servicios */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Min Services
									</label>
									<select
										value={filters.minServices || ''}
										onChange={(e) => handleInputChange('minServices', e.target.value)}
										className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									>
										<option value="">Any Amount</option>
										<option value="1">1+ Services</option>
										<option value="3">3+ Services</option>
										<option value="5">5+ Services</option>
										<option value="10">10+ Services</option>
									</select>
								</div>

								{/* Ubicación */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Location
									</label>
									<input
										type="text"
										placeholder="City, Country"
										value={filters.location || ''}
										onChange={(e) => handleInputChange('location', e.target.value)}
										className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									/>
								</div>

								{/* Orden de clasificación */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Order
									</label>
									<select
										value={filters.sortOrder || 'desc'}
										onChange={(e) => handleInputChange('sortOrder', e.target.value)}
										className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									>
										<option value="desc">High to Low</option>
										<option value="asc">Low to High</option>
									</select>
								</div>
							</div>

							{/* Botón para limpiar filtros */}
							<button
								onClick={clearAllFilters}
								className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
							>
								Clear All Filters
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default FreelancerSearchFilter;