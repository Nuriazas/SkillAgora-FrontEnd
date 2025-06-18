import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import SimpleHeroSection from "../components/SimpleHeroSection.jsx";
import { FreelancerCard } from "../components/FreelancersList/FreelancerCard.jsx";
import { FreelancerModal } from "../components/FreelancersList/FreelancerModal.jsx";
import { FreelancerPagination } from "../components/FreelancersList/FreelancerPagination.jsx";
import Footer from "../components/Footer";
import { freelancerService } from "../services/getAllFreelancersService.js";

const ITEMS_PER_PAGE = 6;

const FreelancerPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState("rating");
	const [filterSpecialty, setFilterSpecialty] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedFreelancer, setSelectedFreelancer] = useState(null);
	const [viewMode, setViewMode] = useState("grid");
	const [isLoading, setIsLoading] = useState(false);
	const [freelancers, setFreelancers] = useState([]);
	const [error, setError] = useState(null);
	const [specialties, setSpecialties] = useState([]);

	useEffect(() => {
		const loadFreelancers = async () => {
			setIsLoading(true);
			try {
				const data = await freelancerService.getAll();
				setFreelancers(data);
				// Extraer especialidades únicas de los freelancers
				const uniqueSpecialties = [...new Set(data.map((f) => f.specialty))];
				setSpecialties(uniqueSpecialties);
				setError(null);
			} catch (err) {
				setError("Error loading freelancers");
				console.error("Error:", err);
			} finally {
				setIsLoading(false);
			}
		};

		loadFreelancers();
	}, []);

	// Filtrar freelancers basado en el término de búsqueda y especialidad
	const filteredFreelancers = freelancers.filter((freelancer) => {
		const matchesSearch =
			freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			freelancer.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			freelancer.location?.toLowerCase().includes(searchTerm.toLowerCase());

		const matchesSpecialty = filterSpecialty
			? freelancer.specialty === filterSpecialty
			: true;

		return matchesSearch && matchesSpecialty;
	});

	// Ordenar freelancers
	const sortedFreelancers = [...filteredFreelancers].sort((a, b) => {
		if (sortBy === "rating") return b.rating - a.rating;
		if (sortBy === "price") return b.hourly_rate - a.hourly_rate;
		return 0;
	});

	// Calcular paginación
	const totalPages = Math.ceil(sortedFreelancers.length / ITEMS_PER_PAGE);
	const paginatedFreelancers = sortedFreelancers.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

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

	// Rellenar hasta ITEMS_PER_PAGE tarjetas
	const cards = [
		...paginatedFreelancers,
		...Array(ITEMS_PER_PAGE - paginatedFreelancers.length).fill(null),
	];

	if (error) {
		return (
			<div className="min-h-screen bg-gray-950 flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-white mb-4">
						Oops! Something went wrong
					</h2>
					<p className="text-gray-400 mb-6">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
					>
						Try again
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
					title="Find Amazing"
					highlightText="Freelancers"
					subtitle="Connect with skilled professionals ready to bring your vision to life. Browse through talented freelancers and find the perfect match for your project."
					showStats={false}
				/>

				{/* Filtros y búsqueda */}
				<section className="py-8 px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
						<div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-6 mb-8">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{/* Búsqueda */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Search Freelancers
									</label>
									<input
										type="text"
										placeholder="Search by name, specialty, location..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									/>
								</div>

								{/* Filtro por especialidad */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Specialty
									</label>
									<select
										value={filterSpecialty}
										onChange={(e) => setFilterSpecialty(e.target.value)}
										className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									>
										<option value="">All Specialties</option>
										{specialties.map((specialty, index) => (
											<option key={`specialty-${index}`} value={specialty}>
												{specialty}
											</option>
										))}
									</select>
								</div>

								{/* Ordenar por */}
								<div>
									<label className="block text-sm font-medium text-gray-300 mb-2">
										Sort By
									</label>
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
									>
										<option value="rating">Rating</option>
										<option value="price">Hourly Rate</option>
									</select>
								</div>
							</div>
						</div>

						{/* Resultados */}
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
								{totalPages > 1 && (
									<div className="flex justify-center">
										<FreelancerPagination
											currentPage={currentPage}
											totalPages={totalPages}
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
