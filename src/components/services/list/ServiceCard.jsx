import React from "react";
import { FiStar, FiMapPin, FiUser } from "react-icons/fi";
import DefaultAvatar from "../../../assets/defaultAvatar.jpeg";
import { useTranslation } from "react-i18next";
import DefaultImage from "../../../assets/defaultLogo.png";

const ServiceCard = ({ service, onClick }) => {
  const { t } = useTranslation();
  // Imagen por defecto si el servicio no tiene imagen

  const imageUrl = service.media?.[0]?.media_url 
 ? `http://localhost:3000/uploads/${service.media[0].media_url}` 
 : DefaultImage;


  // Handler para click con validación
  const handleClick = () => {
    if (onClick && typeof onClick === "function") {
      onClick(service);
    }
  };


  // Formatear precio con validación
  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `$${price.toLocaleString()}`;
    }
    return `$${price || "0"}`;
  };

  return (
    <article
      onClick={handleClick}
      className="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl border border-gray-800/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer hover:-translate-y-2 group overflow-hidden"
      role="button"
      tabIndex={0}
      aria-label={t('serviceCard.ariaLabel', { title: service.title })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Imagen del servicio */}
      <div className="aspect-[4/3] bg-gradient-to-br from-purple-900/30 to-blue-900/30 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={t('serviceCard.imageAlt', { title: service.title })}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
        {/* Overlay de gradiente */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"
          aria-hidden="true"
        ></div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Información del freelancer */}
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={service.avatar || DefaultAvatar}
            alt={
              service.user_name
                ? `${service.user_name}'s avatar`
                : "Default avatar"
            }
            className="w-6 h-6 rounded-full object-cover border-2 border-purple-500"
            onError={(e) => {
              e.target.onerror = null; // para evitar loop infinito
              e.target.src = DefaultAvatar;
            }}
          />
          <span className="text-xs text-gray-400 font-medium">
            {service.user_name || t('serviceCard.anonymousUser')}
          </span>
        </div>

        {/* Título del servicio */}
        <h4 className="font-semibold text-white mb-2 text-sm group-hover:text-purple-300 transition-colors">
          {service.title}
        </h4>
			{service.category_name && (
  <div className="text-xs text-gray-400 font-semibold mb-1">
    {service.category_name}
  </div>
)}

        {/* Descripción */}
        <p className="text-xs text-gray-400 mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Footer con rating y precio */}
        <div className="flex items-center justify-between">
          {/* Rating y reseñas */}
          <div className="flex items-center space-x-1">
            <FiStar
              className="w-3 h-3 fill-yellow-400 text-yellow-400"
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-gray-300">
              {service.rating ? Number(service.rating).toFixed(1) : "5.0"}
            </span>
            <span className="text-xs text-gray-500">
              {t('serviceCard.reviews', { count: service.reviews || 0 })}
            </span>
          </div>

          {/* Precio */}
          <div className="font-bold text-purple-400 text-sm">
            {service.price_formatted || t('serviceCard.price', { price: service.price })}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
