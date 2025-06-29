import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFreelancerById } from '../services/api';
// Iconos personalizados usando SVG
const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const UserGroupIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm5.5 3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm2.5 4h-6c-1.66 0-3 1.34-3 3v7h12v-7c0-1.66-1.34-3-3-3zM23 20c0 1.1-.9 2-2 2h-2v-7c0-2.76-2.24-5-5-5h-4c-2.76 0-5 2.24-5 5v7H3c-1.1 0-2-.9-2-2v-4.5c0-1.1.9-2 2-2h3.5c1.1 0 2-.9 2-2s-.9-2-2-2H3c-1.1 0-2-.9-2-2v-3h2v3h3.5c2.21 0 4 1.79 4 4s-1.79 4-4 4H3v4.5z" />
  </svg>
);

const PhoneIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const EnvelopeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const GlobeAltIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const CheckBadgeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white" />
  </svg>
);

const HeartIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const HeartOutlineIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

const ShareIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const TagIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M5.5 7C4.67 7 4 7.67 4 8.5S4.67 10 5.5 10 7 9.33 7 8.5 6.33 7 5.5 7zM21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42z" />
  </svg>
);

const API_BASE = 'http://localhost:3000';

const ProviderDetail = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getFreelancerById(id);

        if (!data.success) {
          throw new Error(data.message || 'Error al cargar los datos del proveedor');
        }

        // Transformamos los datos de la API al formato que espera el componente
        const transformedProvider = {
          id: data.data.id,
          name: data.data.name,
          description: data.data.bio || 'Sin descripción disponible',
          rating: data.data.rating || 0,
          totalReviews: data.data.totalReviews || 0,
          location: data.data.location || 'Ubicación no especificada',
          verified: data.data.isVerified || false,
          responseTime: data.data.responseTime || 'No especificado',
          completedProjects: data.data.completedProjects || 0,
          since: data.data.createdAt ? new Date(data.data.createdAt).getFullYear() : 'N/A',
          contact: {
            phone: data.data.phone || 'No disponible',
            email: data.data.email || 'No disponible',
            website: data.data.portfolio_url || 'No disponible',
          },
          categories: data.data.categories || [],
          services: data.data.services || [],
          reviews: data.data.reviews || [],
          portfolio: data.data.portfolio || [],
        };

        setProvider(transformedProvider);
      } catch (error) {
        console.error('Error fetching provider data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProviderData();
    }
  }, [id]);

  const filteredServices = provider?.services
    .filter((service) => selectedCategory === 'all' || service.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return (
            parseFloat(a.price_number ?? a.price) - parseFloat(b.price_number ?? b.price)
          );
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const filteredReviews = provider?.reviews.filter(
    (review) => reviewFilter === 'all' || review.rating >= parseInt(reviewFilter)
  );

  const renderStars = (rating, size = 'h-5 w-5') => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`${size} ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-red-500 text-xl mb-4">Error al cargar los datos</div>
        <div className="text-gray-600">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-gray-600 text-xl">No se encontró el proveedor</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 overflow-hidden">
      {/* Hero Section con Efecto Difuminado */}
      <div className="relative h-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDIuMjA5IDEuNzkxIDQgNCA0czQtMS43OTEgNC00LTQtMS43OTEtNC00LTQtNC00IDEuNzkxLTQgNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-5"></div>
        <div className="h-full px-4 py-4 relative">
          <div className="grid grid-cols-12 gap-4 h-full">
            {/* Columna Principal */}
            <div className="col-span-9 flex flex-col">
              <div className="flex items-center mb-2">
                <h1 className="text-2xl font-black mr-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-purple-200 animate-gradient">
                  {provider.name}
                </h1>
                {provider.verified && (
                  <div className="bg-white/5 backdrop-blur-2xl rounded-full p-1.5 shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse">
                    <CheckBadgeIcon
                      className="h-4 w-4 text-indigo-300"
                      title="Proveedor verificado"
                    />
                  </div>
                )}
              </div>

              <p className="text-sm text-indigo-100 mb-2 max-w-2xl leading-relaxed font-light">
                {provider.description}
              </p>

              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="bg-white/5 backdrop-blur-2xl rounded-xl p-2 transform hover:scale-105 transition-all duration-700 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/5">
                  <div className="flex justify-center mb-1">
                    {renderStars(provider.rating, 'h-4 w-4')}
                  </div>
                  <p className="text-xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                    {provider.rating}
                  </p>
                  <p className="text-xs text-indigo-200 text-center font-light">
                    {provider.totalReviews} reseñas
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-2xl rounded-xl p-2 transform hover:scale-105 transition-all duration-700 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/5">
                  <UserGroupIcon className="h-4 w-4 mx-auto mb-1 text-indigo-300" />
                  <p className="text-xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                    {provider.completedProjects}
                  </p>
                  <p className="text-xs text-indigo-200 text-center font-light">Proyectos</p>
                </div>

                <div className="bg-white/5 backdrop-blur-2xl rounded-xl p-2 transform hover:scale-105 transition-all duration-700 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/5">
                  <ClockIcon className="h-4 w-4 mx-auto mb-1 text-indigo-300" />
                  <p className="text-lg font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                    {provider.responseTime}
                  </p>
                  <p className="text-xs text-indigo-200 text-center font-light">Respuesta</p>
                </div>

                <div className="bg-white/5 backdrop-blur-2xl rounded-xl p-2 transform hover:scale-105 transition-all duration-700 shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/5">
                  <CalendarIcon className="h-4 w-4 mx-auto mb-1 text-indigo-300" />
                  <p className="text-lg font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                    Desde {provider.since}
                  </p>
                  <p className="text-xs text-indigo-200 text-center font-light">En el mercado</p>
                </div>
              </div>

              <div className="flex items-center text-indigo-200 mb-2">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span className="text-sm font-light">{provider.location}</span>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-slate-950/80 backdrop-blur-2xl rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] mb-2">
                <nav className="flex space-x-1 p-1">
                  {[
                    { key: 'products', label: 'Servicios', icon: TagIcon },
                    { key: 'reviews', label: 'Valoraciones', icon: StarIcon },
                    { key: 'portfolio', label: 'Portfolio', icon: UserGroupIcon },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`${
                        activeTab === key
                          ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500'
                          : 'text-indigo-200 hover:text-white hover:bg-white/5'
                      } whitespace-nowrap py-1.5 px-3 font-medium text-xs flex items-center transition-all duration-700 rounded-lg`}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content Area */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-white/5 p-2 flex-1 overflow-auto">
                {activeTab === 'products' && (
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="relative">
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="appearance-none bg-white/5 backdrop-blur-2xl border border-white/5 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)] text-white text-sm"
                        >
                          <option value="all">Todas las categorías</option>
                          {provider.categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <ChevronDownIcon className="absolute right-2 top-2 h-4 w-4 text-white pointer-events-none" />
                      </div>

                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="appearance-none bg-white/5 backdrop-blur-2xl border border-white/5 rounded-lg px-3 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)] text-white text-sm"
                        >
                          <option value="rating">Mejor valorados</option>
                          <option value="price">Precio</option>
                          <option value="name">Nombre</option>
                        </select>
                        <ChevronDownIcon className="absolute right-2 top-2 h-4 w-4 text-white pointer-events-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {filteredServices?.map((service) => (
                        <div
                          key={service.id}
                          className={`bg-white/5 backdrop-blur-2xl rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-700 overflow-hidden transform hover:-translate-y-1 border border-white/5 ${
                            service.featured ? 'ring-2 ring-indigo-500' : ''
                          }`}
                        >
                          {service.featured && (
                            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1">
                              ⭐ DESTACADO
                            </div>
                          )}

                          <div className="p-2">
                            <h3 className="text-base font-bold text-white mb-1">{service.name}</h3>
                            <p className="text-indigo-200 mb-2 text-xs line-clamp-2">
                              {service.description}
                            </p>

                            <div className="flex items-center mb-2">
                              {renderStars(service.rating, 'h-3 w-3')}
                              <span className="ml-1 text-white font-medium text-xs">
                                {service.rating}
                              </span>
                            </div>

                            <div className="flex justify-between items-center mb-2">
                              <span className="text-indigo-300 font-bold text-xs">
                                {service.price_formatted || `$${service.price}`}
                              </span>
                              <span className="text-indigo-200 text-xs">{service.duration}</span>
                            </div>

                            <button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-1.5 rounded-lg font-bold text-xs hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-700 shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:-translate-y-1">
                              Ver detalles
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center">
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 mb-2">
                          {provider.rating}
                        </div>
                        <div className="flex justify-center mb-2">
                          {renderStars(provider.rating, 'h-8 w-8')}
                        </div>
                        <p className="text-indigo-200 text-sm">
                          Basado en {provider.totalReviews} reseñas
                        </p>
                      </div>

                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const count = provider.reviews.filter((r) => r.rating === stars).length;
                          const percentage = (count / provider.reviews.length) * 100;
                          return (
                            <div key={stars} className="flex items-center space-x-2">
                              <span className="text-white text-sm w-6">{stars}★</span>
                              <div className="flex-1 bg-white/5 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-indigo-200 w-6 text-sm">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {filteredReviews?.map((review) => (
                        <div
                          key={review.id}
                          className="bg-white/5 backdrop-blur-2xl rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] p-3 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-700 transform hover:-translate-y-1 border border-white/5"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-base font-bold text-white mb-2">{review.user}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex">{renderStars(review.rating, 'h-4 w-4')}</div>
                                <span className="text-indigo-300 text-sm font-medium">
                                  {review.service}
                                </span>
                              </div>
                            </div>
                            <span className="text-indigo-200 text-sm">
                              {new Date(review.date).toLocaleDateString('es-ES')}
                            </span>
                          </div>
                          <p className="text-indigo-200 text-sm mb-2">{review.comment}</p>
                          <div className="flex items-center justify-between">
                            <button className="text-indigo-200 hover:text-indigo-300 text-sm flex items-center transition-colors duration-700">
                              👍 Útil ({review.helpful})
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'portfolio' && (
                  <div>
                    <div className="grid grid-cols-3 gap-3">
                      {provider.portfolio?.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white/5 backdrop-blur-2xl rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] overflow-hidden hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-700 transform hover:-translate-y-1 border border-white/5"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-3">
                            <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
                            <span className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm px-3 py-1 rounded-full">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Columna Lateral */}
            <div className="col-span-3">
              <div className="bg-white/5 backdrop-blur-2xl rounded-xl p-4 shadow-[0_0_40px_rgba(255,255,255,0.1)] border border-white/5 h-full flex flex-col">
                <div className="flex space-x-3 mb-4">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-700 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    {isFavorite ? (
                      <HeartIcon className="h-5 w-5 text-red-400 mr-2" />
                    ) : (
                      <HeartOutlineIcon className="h-5 w-5 text-white mr-2" />
                    )}
                    <span className="text-white font-medium text-sm">Favorito</span>
                  </button>

                  <button className="flex items-center justify-center px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-700 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <ShareIcon className="h-5 w-5 text-white" />
                  </button>
                </div>

                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-3 rounded-lg font-bold text-base hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-700 shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:-translate-y-1 mb-4"
                >
                  Contactar Ahora
                </button>

                <div className="space-y-3 text-white">
                  <div className="flex items-center bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-700">
                    <PhoneIcon className="h-5 w-5 mr-3" />
                    <span className="font-light text-sm">{provider.contact.phone}</span>
                  </div>
                  <div className="flex items-center bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-700">
                    <EnvelopeIcon className="h-5 w-5 mr-3" />
                    <span className="font-light text-sm">{provider.contact.email}</span>
                  </div>
                  <div className="flex items-center bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-700">
                    <GlobeAltIcon className="h-5 w-5 mr-3" />
                    <span className="font-light text-sm">{provider.contact.website}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-2xl flex items-center justify-center z-50 p-4">
          <div className="bg-white/5 backdrop-blur-2xl rounded-xl max-w-md w-full p-6 shadow-[0_0_60px_rgba(255,255,255,0.1)] border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-4">Contactar con {provider.name}</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-bold text-base hover:from-green-600 hover:to-emerald-700 transition-all duration-700 shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:-translate-y-1">
                <PhoneIcon className="h-5 w-5" />
                <span>Llamar ahora</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-bold text-base hover:from-indigo-600 hover:to-purple-700 transition-all duration-700 shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:-translate-y-1">
                <EnvelopeIcon className="h-5 w-5" />
                <span>Enviar email</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-lg font-bold text-base hover:from-gray-700 hover:to-gray-800 transition-all duration-700 shadow-[0_0_30px_rgba(255,255,255,0.2)] transform hover:-translate-y-1">
                <GlobeAltIcon className="h-5 w-5" />
                <span>Visitar web</span>
              </button>
            </div>
            <button
              onClick={() => setShowContactModal(false)}
              className="mt-4 w-full text-indigo-200 py-2 hover:text-white transition-colors duration-700 text-base"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDetail;
