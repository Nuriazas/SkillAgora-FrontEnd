import React from "react";
import { FiStar, FiMapPin, FiUser, FiDollarSign } from "react-icons/fi";

/**
 * Componente FreelancerCard - Tarjeta individual para mostrar un freelancer
 * Estilo consistente con ServiceCard
 */
const FreelancerCard = ({ freelancer, onClick }) => {
	// Imagen por defecto si el freelancer no tiene avatar
	const defaultAvatar =
		"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face";

	// Usar avatar del freelancer o imagen por defecto
	const avatarUrl = freelancer?.avatar || defaultAvatar;

	// Handler para click con validación
	const handleClick = () => {
		if (onClick && typeof onClick === "function" && freelancer) {
			onClick(freelancer);
		}
	};

	// Handler para errores de carga de imagen
	const handleImageError = (e) => {
		e.target.src = defaultAvatar;
	};

	// Formatear precio con validación
	const formatPrice = (rate) => {
		if (typeof rate === "number") {
			return `$${rate}/hr`;
		}
		return `$${rate || "0"}/hr`;
	};

	// Skeleton loader para cuando no hay freelancer
	if (!freelancer) {
		return (
			<article className="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl border border-gray-800/50 overflow-hidden animate-pulse">
				<div className="aspect-[4/3] bg-gradient-to-br from-purple-900/30 to-blue-900/30">
					<div className="w-full h-full bg-gray-700"></div>
				</div>
				<div className="p-4">
					<div className="h-4 bg-gray-700 rounded mb-2"></div>
					<div className="h-4 bg-gray-700 rounded mb-2"></div>
					<div className="h-4 bg-gray-700 rounded mb-4"></div>
					<div className="flex justify-between">
						<div className="h-4 bg-gray-700 rounded w-16"></div>
						<div className="h-4 bg-gray-700 rounded w-12"></div>
					</div>
				</div>
			</article>
		);
	}

	const {
		name = "Anonymous User",
		specialty = "General",
		location = "Remote",
		hourly_rate = 0,
		rating = 0,
		bio = "",
	} = freelancer;

	return (
		<article
			onClick={handleClick}
			className="bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-xl border border-gray-800/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer hover:-translate-y-2 group overflow-hidden"
			role="button"
			tabIndex={0}
			aria-label={`View details for freelancer: ${name}`}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					handleClick();
				}
			}}
		>
			{/* Avatar del freelancer */}
			<div className="aspect-[4/3] bg-gradient-to-br from-purple-900/30 to-blue-900/30 overflow-hidden relative flex items-center justify-center">
				<img
					src={avatarUrl}
					alt={`${name}'s profile picture`}
					className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/50 group-hover:scale-110 transition-transform duration-300 shadow-lg"
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
				{/* Información de la especialidad */}
				<div className="flex items-center space-x-2 mb-3">
					<FiUser className="w-4 h-4 text-purple-400" aria-hidden="true" />
					<span className="text-xs text-purple-300 font-medium">
						{specialty}
					</span>
				</div>

				{/* Nombre del freelancer */}
				<h4 className="font-semibold text-white mb-2 text-sm group-hover:text-purple-300 transition-colors">
					{name}
				</h4>

				{/* Ubicación */}
				<div className="flex items-center space-x-2 mb-3">
					<FiMapPin className="w-3 h-3 text-gray-400" aria-hidden="true" />
					<span className="text-xs text-gray-400">{location}</span>
				</div>

				{/* Bio/descripción */}
				<p className="text-xs text-gray-400 mb-4 line-clamp-2">
					{bio ||
						`Experienced ${specialty.toLowerCase()} professional ready to help with your projects.`}
				</p>

				{/* Footer con rating y precio */}
				<div className="flex items-center justify-between">
					{/* Rating */}
					<div className="flex items-center space-x-1">
						<FiStar
							className="w-3 h-3 fill-yellow-400 text-yellow-400"
							aria-hidden="true"
						/>
						<span className="text-xs font-medium text-gray-300">
							{Number(rating).toFixed(1)}
						</span>
					</div>

					{/* Precio por hora */}
					<div className="flex items-center space-x-1">
						<FiDollarSign
							className="w-3 h-3 text-purple-400"
							aria-hidden="true"
						/>
						<span className="font-bold text-purple-400 text-sm">
							{formatPrice(hourly_rate)}
						</span>
					</div>
				</div>
			</div>
		</article>
	);
};

export { FreelancerCard };
