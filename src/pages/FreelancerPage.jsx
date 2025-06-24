import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header.jsx";
import SimpleHeroSection from "../components/hero/SimpleHeroSection.jsx";
import FreelancerSearchFilter from "../components/FreelancerSearchFilter.jsx";
import { FreelancerCard } from "../components/FreelancersList/FreelancerCard.jsx";
import { FreelancerModal } from "../components/FreelancersList/FreelancerModal.jsx";
import { FreelancerPagination } from "../components/FreelancersList/FreelancerPagination.jsx";
import Footer from "../components/layout/Footer.jsx";
import { freelancerService } from "../services/getAllFreelancersService.js";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 6;

const FreelancerPage = () => {
	const { t } = useTranslation();
	// Estados para filtros centralizados
	const [filters, setFilters] = useState({
		search: "",
		minRating: "",
		maxRating: "",
		minPrice: "",
		maxPrice: "",
		minServices: "",
		location: "",
		sortBy: "rating",
		sortOrder: "desc"
	});
	
	const [currentPage, setCurrentPage] = useState(1);
	
	// Estados de la UI
	const [selectedFreelancer, setSelectedFreelancer] = useState(null);
	const [viewMode, setViewMode] = useState("grid");
	const [isLoading, setIsLoading] = useState(false);
	const [freelancers, setFreelancers] = useState([]);
	const [error, setError] = useState(null);
	const [paginationInfo, setPaginationInfo] = useState(null);

	// Función para cargar freelancers con filtros del backend
	const loadFreelancers = async () => {
		setIsLoading(true);
		try {
			// Construir parámetros de query para el backend
			const params = new URLSearchParams();
			
			// Añadir filtros solo si tienen valor
			if (filters.search) params.append('search', filters.search);
			if (filters.minRating) params.append('minRating', filters.minRating);
			if (filters.maxRating) params.append('maxRating', filters.maxRating);
			if (filters.minPrice) params.append('minPrice', filters.minPrice);
			if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
			if (filters.minServices) params.append('minServices', filters.minServices);
			if (filters.location) params.append('location', filters.location);
			if (filters.sortBy) params.append('sortBy', filters.sortBy);
			if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
			params.append('page', currentPage);
			params.append('limit', ITEMS_PER_PAGE);

			// Llamar al backend con los filtros
			const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/users/freelancers?${params}`);
			const result = await response.json();
			
			if (result.success) {
				setFreelancers(result.data);
				setPaginationInfo(result.pagination);
				setError(null);
			} else {
				throw new Error(result.message || 'Error loading freelancers');
			}
		} catch (err) {
			setError("Error loading freelancers");
			console.error("Error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	// useEffect para cargar freelancers cuando cambien los filtros
	useEffect(() => {
		loadFreelancers();
	}, [filters, currentPage]);

	// Reset página cuando cambien los filtros
	useEffect(() => {
		setCurrentPage(1);
	}, [filters]);

	const handleFreelancerClick = async (freelancer) => {
		try {
			const detailedFreelancer = await freelancerService.getById(freelancer.id);
			setSelectedFreelancer(detailedFreelancer);
		} catch (err) {
			console.error("Error loading freelancer details:", err);
			setError("Error loading freelancer details");
		}
	};

	const closeModal = () => {
		setSelectedFreelancer(null);
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	// Manejadores para el componente de filtros
	const handleFiltersChange = (newFilters) => {
		setFilters(newFilters);
	};

	const handleSearch = (searchTerm) => {
		setFilters(prev => ({ ...prev, search: searchTerm }));
	};

	const clearFilters = () => {
		setFilters({
			search: "",
			minRating: "",
			maxRating: "",
			minPrice: "",
			maxPrice: "",
			minServices: "",
			location: "",
			sortBy: "rating",
			sortOrder: "desc"
		});
		setCurrentPage(1);
	};

	// Rellenar hasta ITEMS_PER_PAGE tarjetas para mantener la grilla uniforme
	const cards = [
		...freelancers,
		...Array(Math.max(0, ITEMS_PER_PAGE - freelancers.length)).fill(null),
	];

	if (error) {
		return (
			<div className="min-h-screen bg-gray-950 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-white mb-4">
						{t('freelancerPage.errorTitle')}
					</h2>
					<p className="text-gray-400 mb-6">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
					>
						{t('freelancerPage.tryAgain')}
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-950 relative overflow-hidden font-sans">
			{/* Animated Background */}
			<div className="absolute inset-0">
				<div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
			</div>

			{/* Grid Pattern Overlay */}
			<div className="absolute inset-0 opacity-40">
				<div
					className="w-full h-full bg-gray-800/5"
					style={{
						backgroundImage:
							"radial-gradient(circle, #9C92AC 1px, transparent 1px)",
						backgroundSize: "60px 60px",
					}}
				></div>
			</div>

			<div className="relative z-10">
				<Header />

				<SimpleHeroSection
					title={t('freelancerPage.heroTitle')}
					highlightText={t('freelancerPage.heroHighlight')}
					subtitle={t('freelancerPage.heroSubtitle')}
					showStats={false}
				/>

				{/* Nuevo componente de filtros unificado */}
				<FreelancerSearchFilter
					onFiltersChange={handleFiltersChange}
					onSearch={handleSearch}
					onClearFilters={clearFilters}
					filters={filters}
				/>

				{/* Resultados */}
				<section className="px-4 sm:px-6 lg:px-8 pb-8">
					<div className="max-w-7xl mx-auto">
						{/* Estadísticas de resultados */}
						{paginationInfo && (
							<div className="text-gray-400 text-sm mb-4">
								{t('freelancerPage.showingResults', { count: freelancers.length, total: paginationInfo.totalResults })}
							</div>
						)}

						{isLoading ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
								{Array(6)
									.fill(null)
									.map((_, index) => (
										<div
											key={index}
											className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6 animate-pulse"
										>
											<div className="h-20 bg-gray-700 rounded mb-4"></div>
											<div className="h-4 bg-gray-700 rounded mb-2"></div>
											<div className="h-4 bg-gray-700 rounded mb-4"></div>
											<div className="h-8 bg-gray-700 rounded"></div>
										</div>
									))}
							</div>
						) : freelancers.length === 0 ? (
							<div className="text-center py-12">
								<div className="text-gray-400 text-lg mb-4">
									{t('freelancerPage.noResults')}
								</div>
								<button
									onClick={clearFilters}
									className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
								>
									{t('freelancerPage.clearFilters')}
								</button>
							</div>
						) : (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
									{cards.map((freelancer, index) => (
										<FreelancerCard
											key={
												freelancer
													? `freelancer-${freelancer.id}`
													: `empty-${index}`
											}
											freelancer={freelancer}
											viewMode={viewMode}
											onClick={() =>
												freelancer && handleFreelancerClick(freelancer)
											}
										/>
									))}
								</div>

								{/* Paginación */}
								{paginationInfo && paginationInfo.totalPages > 1 && (
									<div className="flex justify-center">
										<FreelancerPagination
											currentPage={paginationInfo.currentPage}
											totalPages={paginationInfo.totalPages}
											onPageChange={handlePageChange}
										/>
									</div>
								)}
							</>
						)}
					</div>
				</section>

				<Footer />
			</div>

			{/* Modal */}
			<FreelancerModal freelancer={selectedFreelancer} onClose={closeModal} />
		</div>
	);
};

export default FreelancerPage;