import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import SimpleHeroSection from "../components/SimpleHeroSection";
import SearchFilter from "../components/SearchFilter";
import ServicesList from "../components/ServicesList";
import Footer from "../components/Footer";
import { servicesApi } from "../services/api/api";
import useServiceFilters from "../hooks/useServiceFilters";
import { useTranslation } from "react-i18next";

// Componente de paginación para servicios (reutilizando la lógica de FreelancerPagination)
const ServicesPagination = ({ currentPage, totalPages, onPageChange }) => {
	const { t } = useTranslation();
	if (totalPages <= 1) return null;

	const handlePreviousPage = () => {
		onPageChange(Math.max(1, currentPage - 1));
	};

	const handleNextPage = () => {
		onPageChange(Math.min(totalPages, currentPage + 1));
	};

	const handlePageClick = (page) => {
		onPageChange(page);
	};

	// Generar números de página a mostrar
	const getPageNumbers = () => {
		const pages = [];
		const maxVisible = 5;
		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		let end = Math.min(totalPages, start + maxVisible - 1);

		// Ajustar el inicio si llegamos al final
		if (end - start < maxVisible - 1) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	const pageNumbers = getPageNumbers();

	return (
		<nav
			className="flex justify-center items-center gap-2 mt-8 mb-8"
			aria-label="Pagination navigation"
		>
			{/* Botón anterior */}
			<button
				onClick={handlePreviousPage}
				disabled={currentPage === 1}
				className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900/80 disabled:hover:text-gray-300"
				aria-label={t('servicesPage.pagination.previousAria')}
			>
				<span>←</span>
				<span className="hidden sm:inline">{t('servicesPage.pagination.previous')}</span>
			</button>

			{/* Números de página */}
			<div className="flex gap-1">
				{/* Primera página si no está visible */}
				{pageNumbers[0] > 1 && (
					<>
						<button
							onClick={() => handlePageClick(1)}
							className="w-10 h-10 flex items-center justify-center bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 text-sm font-medium"
						>
							1
						</button>
						{pageNumbers[0] > 2 && (
							<span className="w-10 h-10 flex items-center justify-center text-gray-500">
								...
							</span>
						)}
					</>
				)}

				{/* Páginas visibles */}
				{pageNumbers.map((page) => (
					<button
						key={page}
						onClick={() => handlePageClick(page)}
						className={`w-10 h-10 flex items-center justify-center backdrop-blur-xl border rounded-xl transition-all duration-200 text-sm font-medium ${
							page === currentPage
								? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500/50 text-white shadow-lg hover:shadow-purple-500/25"
								: "bg-gray-900/80 border-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800/80"
						}`}
						aria-label={t('servicesPage.pagination.goToPage', { page })}
						aria-current={page === currentPage ? "page" : undefined}
					>
						{page}
					</button>
				))}

				{/* Última página si no está visible */}
				{pageNumbers[pageNumbers.length - 1] < totalPages && (
					<>
						{pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
							<span className="w-10 h-10 flex items-center justify-center text-gray-500">
								...
							</span>
						)}
						<button
							onClick={() => handlePageClick(totalPages)}
							className="w-10 h-10 flex items-center justify-center bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 text-sm font-medium"
						>
							{totalPages}
						</button>
					</>
				)}
			</div>

			{/* Botón siguiente */}
			<button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900/80 disabled:hover:text-gray-300"
				aria-label={t('servicesPage.pagination.nextAria')}
			>
				<span className="hidden sm:inline">{t('servicesPage.pagination.next')}</span>
				<span>→</span>
			</button>

			{/* Info de página */}
			<div className="ml-4 text-sm text-gray-400">
				{t('servicesPage.pagination.pageInfo', { currentPage, totalPages })}
			</div>
		</nav>
	);
};

const ITEMS_PER_PAGE = 6;

const ServicesPage = () => {
	const { t } = useTranslation();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const {
		filteredServices,
		filters,
		handleFiltersChange,
		handleSearch,
		clearFilters,
	} = useServiceFilters();

	useEffect(() => {
		loadInitialData();
	}, []);

	// Reset página cuando cambien los filtros
	useEffect(() => {
		setCurrentPage(1);
	}, [filteredServices]);

	const loadInitialData = async () => {
		try {
			setLoading(true);
			const categoriesResponse = await servicesApi.getCategories();
			setCategories(categoriesResponse.data);
		} catch (err) {
			setError("Error loading data");
			console.error("Error loading initial data:", err);
		} finally {
			setLoading(false);
		}
	};

	// Calcular paginación
	const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
	const paginatedServices = filteredServices.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
		// Scroll al top cuando cambie de página
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (error) {
		return (
			<div className="min-h-screen bg-gray-950 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-white mb-4">
						{t('servicesPage.errorTitle')}
					</h2>
					<p className="text-gray-400 mb-6">{error}</p>
					<button
						onClick={loadInitialData}
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
					>
						{t('servicesPage.tryAgain')}
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
					title={t('servicesPage.heroTitle')}
					highlightText={t('servicesPage.heroHighlight')}
					subtitle={t('servicesPage.heroSubtitle')}
					showStats={false}
				/>

				<SearchFilter
					onFiltersChange={handleFiltersChange}
					onSearch={handleSearch}
					onClearFilters={clearFilters}
					categories={categories}
					filters={filters}
				/>

				{/* Mostrar información de resultados */}
				{!loading && (
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
						<p className="text-gray-400 text-sm">
							{t('servicesPage.showingResults', {
								from: ((currentPage - 1) * ITEMS_PER_PAGE) + 1,
								to: Math.min(currentPage * ITEMS_PER_PAGE, filteredServices.length),
								total: filteredServices.length
							})}
						</p>
					</div>
				)}

				<ServicesList
					services={paginatedServices}
					loading={loading}
					showTitle={false}
					limit={ITEMS_PER_PAGE}  // Agregar esta línea
				/>

				{/* Paginación */}
				{!loading && totalPages > 1 && (
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<ServicesPagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				)}

				<Footer />
			</div>
		</div>
	);
};

export default ServicesPage;