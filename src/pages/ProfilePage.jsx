import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header.jsx";
import SimpleHeroSection from "../components/hero/SimpleHeroSection.jsx";
import Footer from "../components/layout/Footer.jsx";
import ServiceEditModal from "../components/services/edit/ServiceEditModal.jsx";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import { userApi } from "../services/api/api";
import DefaultAvatar from "../assets/defaultAvatar.jpeg";
import Spinner from "../components/shared/UI/Spinner.jsx";
import {
  FiMail,
  FiMapPin,
  FiStar,
  FiCalendar,
  FiEdit,
  FiGlobe,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";
import AdminStatistics from "../components/admin/AdminStatistics.jsx";
import LogoLoader from "../components/shared/UI/LogoLoader";

const ProfilePage = () => {
  const { name } = useParams();
  const { userLogged } = useContext(AuthContext);
  const { t } = useTranslation();

  const [loadingMore, setLoadingMore] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFreelancerButton, setShowFreelancerButton] = useState(true);
  // const [visibleServicesCount, setVisibleServicesCount] = useState(6);
  const servicesContainerRef = useRef();
  const freelancerButtonRef = useRef();

  // Verificar si es el perfil del usuario actual
  const isOwnProfile = React.useMemo(
    () => userLogged?.name === name,
    [userLogged, name]
  );

  // Verificar si el usuario actual es admin
  const isCurrentUserAdmin = React.useMemo(
    () => userLogged?.is_admin === 1,
    [userLogged]
  );

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, [name]);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('showFreelancerRequestButton') === 'true') {
      sessionStorage.removeItem('showFreelancerRequestButton');
      setTimeout(() => {
        if (freelancerButtonRef.current) {
          freelancerButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          freelancerButtonRef.current.classList.add('animate-pulse-freelancer');
          setTimeout(() => {
            freelancerButtonRef.current.classList.remove('animate-pulse-freelancer');
          }, 1500);
        }
      }, 300);
    }
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await userApi.getProfileByName(name);

      if (response.success) {
        setProfileData(response.data);
      } else {
        setError(t('profile.notFound'));
      }
    } catch (err) {
      setError("Error loading profile");
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handler para abrir modal de edición de servicio
  const handleEditService = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  // Handler para eliminar servicio
// Handler para eliminar servicio
  const handleServiceDelete = async (deletedServiceId) => {
    setProfileData((prev) => ({
      ...prev,
      services: prev.services.filter((service) => 
        service.service_id !== deletedServiceId
      ),
    }));
  };

  // Handler para actualizar servicio después de la edición
  const handleServiceUpdate = async (updatedService) => {
    setProfileData((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.service_id === updatedService.service_id
          ? updatedService
          : service
      ),
    }));
    await loadProfile();
  };

  // Handler para solicitud de freelancer
  const handleFreelancerRequest = async () => {
    setShowSuccessMessage(true);
    setShowFreelancerButton(false);
    // Llama al endpoint correcto del backend para crear la solicitud de freelancer y la notificación
    try {
      await fetch(`http://localhost:3000/users/request-freelancer-status/${userLogged.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      // Si falla, solo mostramos el mensaje local igualmente
      console.error('Error enviando solicitud de freelancer:', e);
    }
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 relative overflow-hidden font-sans">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10">
          <Header />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('profile.notFoundTitle')}
              </h2>
              <p className="text-gray-400 mb-6">{error}</p>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                {t('profile.goBack')}
              </button>
            </div>
          </div>
          <Footer />
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

        {/* Mensaje de éxito para solicitud de freelancer */}
        {showSuccessMessage && (
          <div className="fixed top-20 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg border border-purple-500/30">
            {t('profile.freelancerRequestSuccess', 'Solicitud enviada exitosamente. Te contactaremos pronto.')}
          </div>
        )}

        {loading ? (
          // Loading skeleton
          <section className="py-8 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-4xl mx-auto flex justify-center items-center min-h-[200px]">
              <LogoLoader size={48} />
            </div>
          </section>
        ) : (
          // Profile content
          <section className="py-8 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Main Profile Card */}
              <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Avatar */}
                  <img
                    src={profileData?.avatar || DefaultAvatar}
                    alt={`${profileData?.name}'s avatar`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/50 shadow-2xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = DefaultAvatar;
                    }}
                  />

                  {/* Profile Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                      <h1 className="text-3xl font-bold text-white">
                        {profileData?.name} {profileData?.lastName}
                      </h1>
                      {/* Badge de rol solo si NO es admin (id, user_id o _id !== 1) */}
                      {profileData && (profileData.id !== 1 && profileData.user_id !== 1 && profileData._id !== 1) && (
                        profileData.role === "freelancer" ? (
                          <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-700 text-white flex items-center" title="Freelancer">🟣 Freelancer</span>
                        ) : profileData.role === "client" ? (
                          <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white flex items-center" title="Cliente">🔵 Cliente</span>
                        ) : null
                      )}
                      {isOwnProfile && (
                        <button
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                          onClick={() => navigate("/edit-profile")}
                        >
                          <FiEdit className="w-5 h-5" />
                        </button>
                      )}
                      {/* NUEVO: Solicitud para ser freelancer - Solo para usuarios que NO sean admin (ID 1) */}
                      {isOwnProfile && showFreelancerButton && userLogged?.id !== 1 && (
                        <div className="flex flex-col items-end ml-auto" ref={freelancerButtonRef}>
                          <span className="text-xs text-gray-300 mb-1">{t('profile.wantToBeFreelancer', '¿Quieres ser freelancer?')}</span>
                          <button
                            className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-xs font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow"
                            type="button"
                            onClick={handleFreelancerRequest}
                          >
                            {t('profile.requestHere', 'Solicítalo aquí')}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 justify-center md:justify-start text-gray-400">
                        <FiMail className="w-4 h-4" />
                        <span>{profileData?.email}</span>
                      </div>

                      {profileData?.location && (
                        <div className="flex items-center gap-2 justify-center md:justify-start text-gray-400">
                          <FiMapPin className="w-4 h-4" />
                          <span>{profileData.location}</span>
                        </div>
                      )}

                      {profileData?.language && (
                        <div className="flex items-center gap-2 justify-center md:justify-start text-gray-400">
                          <FiGlobe className="w-4 h-4" />
                          <span>{profileData.language}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 justify-center md:justify-start text-gray-400">
                        <FiCalendar className="w-4 h-4" />
                        <span>
                          {profileData?.created_at 
                            ? t('profile.memberSince', { 
                                date: new Date(profileData.created_at).toLocaleDateString('es-ES', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })
                              })
                            : t('profile.memberSince', { date: 'N/A' })
                          }
                        </span>
                      </div>

                      {/* Rating - Solo para usuarios que NO sean admin (ID 1) */}
                      {profileData?.average_rating && userLogged?.id !== 1 && (
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <FiStar className="w-4 h-4 text-yellow-400" />
                          <span className="text-white font-medium">
                            {Number(profileData.average_rating).toFixed(1)}
                          </span>
                          <span className="text-gray-400">{t('profile.rating')}</span>
                        </div>
                      )}
                    </div>

                    {profileData?.bio && (
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {profileData.bio}
                      </p>
                    )}

                    {profileData?.portfolio_url && (
                      <a
                        href={profileData.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <FiGlobe className="w-4 h-4" />
                        {t('profile.viewPortfolio')}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Services Section */}
              {profileData?.services && profileData.services.length > 0 && (
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-8 max-h-[500px] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {isOwnProfile ? t('profile.myServices') : t('profile.services')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileData?.services?.map((service, index) => (
                      <div
                        key={service.service_id || index}
                        className={`group bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 transition-all duration-300 ${
                          isOwnProfile
                            ? "hover:bg-gray-700/50 hover:border-purple-500/50 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
                            : ""
                        }`}
                        onClick={
                          isOwnProfile
                            ? () => handleEditService(service)
                            : undefined
                        }
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-white flex-1">
                            {service.title}
                          </h3>
                          {isOwnProfile && (
                            <FiEdit className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                          )}
                        </div>

                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {service.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            {service.price_formatted ? (
                              <span className="text-purple-400 font-bold">
                                {service.price_formatted}
                              </span>
                            ) : (
                              <>
                                <FiDollarSign className="w-4 h-4 text-purple-400" />
                                <span className="text-purple-400 font-bold">
                                  ${service.price}
                                </span>
                              </>
                            )}
                          </div>

                            {service.delivery_time_days && (
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <FiClock className="w-4 h-4 text-blue-400" />
                                <span>
                                  {t('profile.daysDelivery', { days: service.delivery_time_days })}
                                </span>
                              </div>
                            )}

                          {service.place && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <FiMapPin className="w-4 h-4 text-green-400" />
                              <span>{service.place}</span>
                            </div>
                          )}
                        </div>

                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 bg-gray-700/50 px-2 py-1 rounded">
                              {service.category_name}
                            </span>
                            {isOwnProfile && (
                              <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {t('profile.clickToEdit')}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {profileData?.experience && (
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {t('profile.experience')}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {profileData.experience}
                  </p>
                </div>
              )}

              {/* Admin Statistics Section - Solo visible para administradores */}
              <AdminStatistics isVisible={isCurrentUserAdmin} />


              {profileData?.reviews && profileData.reviews.length > 0 ? (
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-8 max-h-[400px] overflow-y-auto mt-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Reviews
                  </h2>
                  <div className="space-y-6">
                    {profileData.reviews.map((review, index) => (
                      <div
                        key={review.id || index}
                        className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {review.reviewer_name|| "Anonymous"}
                          </h3>
                          <div className="flex items-center gap-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={
                                  i < review.rating
                                    ? "opacity-100"
                                    : "opacity-30"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {review.comment}
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-800/50 p-8 max-h-[200px] overflow-y-auto mt-8 text-gray-400 text-center">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Reviews
                  </h2>
                  <p>No reviews yet.</p>
                </div>
              )}
            </div>
          </section>
        )}

        <Footer />
      </div>

      {/* Modal de edición de servicio */}
      <ServiceEditModal
        service={selectedService}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedService(null);
        }}
        onUpdate={handleServiceUpdate}
        onDelete={handleServiceDelete}
      />

      <style>{`
      @keyframes pulse-freelancer {
        0% { box-shadow: 0 0 0 0 rgba(139,92,246,0.7); }
        70% { box-shadow: 0 0 0 10px rgba(139,92,246,0); }
        100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); }
      }
      .animate-pulse-freelancer {
        animation: pulse-freelancer 1.5s;
      }
      `}</style>
    </div>
  );
};

export default ProfilePage;
