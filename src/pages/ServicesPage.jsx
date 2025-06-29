import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header.jsx";
import SimpleHeroSection from "../components/hero/SimpleHeroSection.jsx";
import SearchFilter from "../components/search/SearchFilter.jsx";
import ServicesList from "../components/services/list/ServicesList.jsx";
import Footer from "../components/layout/Footer.jsx";
import { servicesApi } from "../services/api/api";
import useServiceFilters from "../hooks/services/useServiceFilters.js";
import ServicesPagination from "../components/services/components/ServicePagination.jsx";
import { useTranslation } from "react-i18next";


const ITEMS_PER_PAGE = 6;	// limite de servicios por página

const ServicesPage = () => {
	const { t } = useTranslation();
	// Estados para manejar los datos de servicios, categorías, carga y errores
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	const {	// Trae los filtros y servicios filtrados y funciones para manejar los filtros y búsqueda
		filteredServices,
		filters,
		handleFiltersChange,
		handleSearch,
		clearFilters,
	} = useServiceFilters();

	useEffect(() => {	// Cargar datos iniciales al montar el componente
		loadInitialData();
	}, []);

	// Reset página cuando cambien los filtros
	useEffect(() => {
		setCurrentPage(1);
	}, [filteredServices]);

	const loadInitialData = async () => {	// Función para cargar las categorías y servicios al inicio
		try {
			setLoading(true);
			const categoriesResponse = await servicesApi.getCategories();	// Obtiene categorías
			setCategories(categoriesResponse.data);	// Actualiza el estado de categorías
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

	const handlePageChange = (newPage) => { // Función para manejar el cambio de página
		setCurrentPage(newPage);
		window.scrollTo({ top: 0, behavior: 'smooth' });	// Scroll al top cuando cambie de página
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

			<div className="relative z-10 pt-24">
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
				{!loading && (	// Si no está cargando, muestra la información de resultados
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
					services={paginatedServices}	// Le pasa a la lista de servicios los servicios paginados 
					loading={loading}
					showTitle={false}
					limit={ITEMS_PER_PAGE}
/>

				{/* Paginación */}
				{!loading && totalPages > 1 && (	// Si no está cargando y hay más de una página, muestra la paginación
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