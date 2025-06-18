import React, { useState, useEffect } from "react";
import { Header } from "../../components/shared/Header/index.jsx";
import { SearchBar } from "../../components/FreelancersList/SearchBar";
import { FreelancerCard } from "../../components/FreelancersList/FreelancerCard";
import { Modal } from "../../components/FreelancersList/Modal";
import { Pagination } from "../../components/FreelancersList/Pagination";
import { Background } from "../../components/shared/Background/index.jsx";
import { freelancerService } from "../../services/getAllFreelancersService.js";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

const FreelancersList = () => {
  const navigate = useNavigate();
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
        setError("Error al cargar los freelancers");
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
      console.error("Error al cargar detalles del freelancer:", err);
      setError("Error al cargar detalles del freelancer");
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

  return (
    <div className="min-h-screen bg-lightBackground dark:bg-darkBackground w-full flex flex-col items-center justify-start relative overflow-x-hidden">
      <div className="w-full flex flex-col items-center">
        <Header />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 my-8 text-center">
          <span className="text-lightGrayText dark:text-darkGrayText text-base sm:text-lg hover:text-darkText dark:hover:text-lightText transition-colors">
            Find Services
          </span>
          <span className="text-lightText dark:text-darkText text-2xl sm:text-3xl font-bold tracking-widest hover:text-lightBlue dark:hover:text-darkBlue transition-colors">
            SERVICES
          </span>
          <span className="text-lightGrayText dark:text-darkGrayText text-base sm:text-lg hover:text-darkText dark:hover:text-lightText transition-colors">
            Find Jobs
          </span>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterSpecialty={filterSpecialty}
          setFilterSpecialty={setFilterSpecialty}
          sortBy={sortBy}
          setSortBy={setSortBy}
          specialties={specialties}
          viewMode={viewMode}
          setViewMode={setViewMode}
          className="max-w-xl mb-8"
        />

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="relative flex-1 w-full flex items-center justify-center py-8 sm:py-16">
          <Background />

          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col"
            } gap-6 sm:gap-8 w-full max-w-6xl px-2 sm:px-0 place-items-center transition-all duration-300 ${
              isLoading ? "opacity-50" : "opacity-100"
            } z-10`}
          >
            {cards.map((freelancer, i) => (
              <FreelancerCard
                key={i}
                freelancer={freelancer}
                viewMode={viewMode}
                onClick={() => freelancer && handleFreelancerClick(freelancer)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          <Modal freelancer={selectedFreelancer} onClose={closeModal} />
        </div>
      </div>
    </div>
  );
};

export default FreelancersList;
