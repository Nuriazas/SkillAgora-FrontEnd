import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SearchFilter from "../components/SearchFilter";
import ServicesList from "../components/ServicesList";
import Footer from "../components/Footer";
import { servicesApi } from "../services/api/api";
import useServiceFilters from "../hooks/useServiceFilters";

const LandingPage = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

	const loadInitialData = async () => {
		try {
			setLoading(true);
			const [servicesResponse, categoriesResponse] = await Promise.all([
				servicesApi.getFeaturedServices(8),
				servicesApi.getCategories(),
			]);

			setCategories(categoriesResponse.data);
		} catch (err) {
			setError("Error al cargar los datos");
			console.error("Error loading initial data:", err);
		} finally {
			setLoading(false);
		}
	};

	if (error) {
		return (
			<div className="min-h-screen bg-gray-950 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-white mb-4">
						Oops! Algo salió mal
					</h2>
					<p className="text-gray-400 mb-6">{error}</p>
					<button
						onClick={loadInitialData}
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
					>
						Intentar de nuevo
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
				<HeroSection />
				<SearchFilter
					onFiltersChange={handleFiltersChange}
					onSearch={handleSearch}
					onClearFilters={clearFilters}
					categories={categories}
					filters={filters}
				/>
				<ServicesList services={filteredServices} loading={loading} />
				<Footer />
			</div>
		</div>
	);
};

export default LandingPage;
