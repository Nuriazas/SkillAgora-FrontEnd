import React from "react";
import { FiStar, FiMapPin, FiUser } from "react-icons/fi";

/**
 * Componente ServiceCard - Tarjeta individual para mostrar un servicio
 * @param {Object} service - Objeto con datos del servicio
 * @param {string} service.title - Título del servicio
 * @param {string} service.description - Descripción del servicio
 * @param {string} service.user_name - Nombre del freelancer
 * @param {number} service.price - Precio del servicio
 * @param {number} service.rating - Calificación promedio (opcional)
 * @param {number} service.reviews - Número de reseñas (opcional)
 * @param {string} service.image - URL de imagen del servicio (opcional)
 * @param {Function} onClick - Callback ejecutado al hacer clic en la tarjeta
 */
const ServiceCard = ({ service, onClick }) => {
	// Imagen por defecto si el servicio no tiene imagen
	const defaultImage =
		"https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop";

	// Usar imagen del servicio o imagen por defecto
	const imageUrl = service.image || defaultImage;

	// Handler para click con validación
	const handleClick = () => {
		if (onClick && typeof onClick === "function") {
			onClick(service);
		}
	};

	// Handler para errores de carga de imagen
	const handleImageError = (e) => {
		e.target.src = defaultImage;
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
			aria-label={`Ver detalles del servicio: ${service.title}`}
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
					alt={`Imagen del servicio: ${service.title}`}
					className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
					onError={handleImageError}
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
					<FiUser className="w-4 h-4 text-purple-400" aria-hidden="true" />
					<span className="text-xs text-gray-400 font-medium">
						{service.user_name || "Usuario anónimo"}
					</span>
				</div>

				{/* Título del servicio */}
				<h4 className="font-semibold text-white mb-2 text-sm group-hover:text-purple-300 transition-colors">
					{service.title}
				</h4>

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
							({service.reviews || "0"} reseñas)
						</span>
					</div>

					{/* Precio */}
					<div className="font-bold text-purple-400 text-sm">
						{formatPrice(service.price)}
					</div>
				</div>
			</div>
		</article>
	);
};

export default ServiceCard;
