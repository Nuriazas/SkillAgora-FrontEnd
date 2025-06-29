import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import Header from "../components/layout/Header.jsx";
import HeroSection from "../components/hero/HeroSection.jsx";
import SearchFilter from "../components/search/SearchFilter.jsx";
import ServicesList from "../components/services/list/ServicesList.jsx";
import FreelancersList from "../components/FreelancersList/FreelancerList.jsx";
import Footer from "../components/layout/Footer.jsx";
import Banner from "../components/shared/Banner.jsx";
import FloatingFreelancerButton from "../components/shared/FloatingFreelancerButton.jsx";
import { servicesApi } from "../services/api/api";
import useServiceFilters from "../hooks/services/useServiceFilters.js";
import { useFreelancersList } from "../hooks/freelancers/useFreelancersList.js";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import HowItWorksSection from "../components/shared/HowItWorksSection.jsx";
import LogoLoader from "../components/shared/UI/LogoLoader";

const LandingPage = () => {
	const { t } = useTranslation();
	const { userLogged } = useContext(AuthContext);
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showWelcome, setShowWelcome] = useState(false);

	const {
		filteredServices,
		filters,
		handleFiltersChange,
		handleSearch,
		clearFilters,
	} = useServiceFilters();

	// Hook para freelancers
	const {
		freelancers,
		loading: freelancersLoading,
		error: freelancersError,
	} = useFreelancersList();

	// --- Sticky search logic ---
	const searchRef = useRef(null);
	const [showStickySearch, setShowStickySearch] = useState(false);
	const [stickyValue, setStickyValue] = useState(filters.search || "");

	// Sincronizar stickyValue con el filtro principal
	useEffect(() => {
		setStickyValue(filters.search || "");
	}, [filters.search]);

	// Detectar visibilidad de la barra de búsqueda
	useEffect(() => {
		const observer = new window.IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setShowStickySearch(false);
				} else {
					setShowStickySearch(true);
				}
			},
			{ root: null, threshold: 0 }
		);
		if (searchRef.current) {
			observer.observe(searchRef.current);
		}
		return () => {
			if (searchRef.current) observer.unobserve(searchRef.current);
		};
	}, []);

	const handleStickyInput = useCallback((e) => {
		setStickyValue(e.target.value);
		handleSearch(e.target.value);
	}, [handleSearch]);

	useEffect(() => {
		loadInitialData();
	}, []);

	useEffect(() => {
		// Mostrar animación solo si viene de login (por ejemplo, usando sessionStorage)
		if (userLogged && sessionStorage.getItem('showWelcome') === 'true') {
			setShowWelcome(true);
			setTimeout(() => {
				setShowWelcome(false);
				sessionStorage.removeItem('showWelcome');
			}, 2500);
		}
	}, [userLogged]);

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

	const handleFreelancerPopClick = () => {
		sessionStorage.setItem('showFreelancerRequestButton', 'true');
		console.log('userLogged:', userLogged);
		if (userLogged && userLogged.name) {
			// Normaliza el nombre para la URL (sin espacios, minúsculas)
			const username = userLogged.name.trim().replace(/\s+/g, '-').toLowerCase();
			navigate(`/profile/${username}`);
		} else {
			alert("No se pudo obtener tu perfil. Intenta recargar la página o vuelve a iniciar sesión.");
		}
	};

	if (error) {
		return (
			<div className="min-h-screen bg-gray-950 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-white mb-4">
						{t('landingPage.errorTitle')}
					</h2>
					<p className="text-gray-400 mb-6">{error}</p>
					<button
						onClick={loadInitialData}
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
					>
						{t('landingPage.tryAgain')}
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
				{/* Animación de bienvenida personalizada */}
				{showWelcome && userLogged && (
					<div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none">
						<div className="mt-32 flex items-center gap-4 bg-gray-900/90 border border-purple-500/30 shadow-xl rounded-2xl px-6 py-4 animate-fade-in-out pointer-events-auto">
							<LogoLoader size={36} />
							<span className="text-lg font-semibold text-white">
								{t('landingPage.welcomeBack', { name: userLogged.name })}
							</span>
						</div>
					</div>
				)}
				<Header 
					showStickySearch={showStickySearch} 
					stickyValue={stickyValue}
					onStickyInput={handleStickyInput}
				/>
				<HeroSection />
				<div ref={searchRef}>
					<SearchFilter
						onFiltersChange={handleFiltersChange}
						onSearch={handleSearch}
						onClearFilters={clearFilters}
						categories={categories}
						filters={filters}
					/>
				</div>
				{/* Mostrar solo 7 servicios + 1 carta de "Ver todos" */}
				<ServicesList 
					services={filteredServices} 
					loading={loading} 
					limit={7}
					showViewAll={true}
					isLandingPage={true}
				/>
				{/* Banner entre servicios y freelancers */}
				<Banner />
				<HowItWorksSection />
				{/* Mostrar solo 7 freelancers + 1 carta de "Ver todos" */}
				<div className="mt-14">
					<FreelancersList 
						freelancers={freelancers} 
						loading={freelancersLoading}
						limit={7}
						showViewAll={true}
						isLandingPage={true}
					/>
				</div>
				<Footer />
				{/* Botón flotante para ser freelancer */}
				<FloatingFreelancerButton show={true} user={userLogged} onClick={handleFreelancerPopClick} />
			</div>
		</div>
	);
};

export default LandingPage;