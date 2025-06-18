import React from "react";
import LandingNavigationButtons from "./LandingNavigationButtons.jsx";

/**
 * Componente SimpleHeroSection - Hero simplificado para páginas internas
 * @param {string} title - Título principal (ej: "Browse All Services")
 * @param {string} subtitle - Subtítulo descriptivo
 * @param {string} highlightText - Texto a resaltar con gradiente
 * @param {Array} stats - Array de estadísticas [{value, label}, ...]
 * @param {boolean} showButtons - Mostrar botones de navegación (default: true)
 * @param {boolean} showStats - Mostrar estadísticas (default: false)
 * @param {string} variant - Variante de estilo: 'default', 'compact' (default: 'default')
 */
const SimpleHeroSection = ({ 
	title, 
	subtitle, 
	highlightText,
	stats = [],
	showButtons = true,
	showStats = false,
	variant = "default"
}) => {
	const isCompact = variant === "compact";

	return (
		<section className={`relative ${isCompact ? 'py-12 lg:py-16' : 'py-14 lg:py-22'} px-4 sm:px-6 lg:px-8`}>
			<div className="max-w-7xl mx-auto text-center relative z-10">
				{/* Título principal */}
				<h1 className={`${isCompact ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold text-white leading-tight mb-6`}>
					{title}{" "}
					{highlightText && (
						<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
							{highlightText}
						</span>
					)}
				</h1>

				{/* Subtítulo */}
				{subtitle && (
					<p className={`${isCompact ? 'text-base md:text-lg' : 'text-lg md:text-xl'} text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8`}>
						{subtitle}
					</p>
				)}

				{/* Botones de navegación centrados */}
				{showButtons && (
					<div className="flex justify-center mb-12">
						<LandingNavigationButtons />
					</div>
				)}

				{/* Estadísticas (solo si showStats es true) */}
				{showStats && stats.length > 0 && (
					<div className="flex flex-wrap gap-8 justify-center pt-8">
						{stats.map((stat, index) => (
							<div 
								key={index}
								className="group hover:scale-105 transition-transform duration-200"
							>
								<div className="text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-200">
									{stat.value}
								</div>
								<div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				)}

				{/* Decoración adicional - línea de gradiente */}
				<div className="mt-12 mx-auto w-24 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-full opacity-60"></div>
			</div>
		</section>
	);
};


export default SimpleHeroSection;