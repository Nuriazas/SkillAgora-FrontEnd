import React from "react";
import { useNavigate } from "react-router-dom";

// componente para los botones de navegación en la página de inicio

const LandingNavigationButtons = () => {
	const navigate = useNavigate();

	const navigationButtons = [
		{
			label: "Browse Services",
			path: "/services",
			variant: "primary",
			ariaLabel: "Browse available services",
		},
		{
			label: "Find Freelancers",
			path: "/freelancers",
			variant: "secondary",
			ariaLabel: "Find freelance professionals",
		},
		{
			label: "Contact Us",
			path: "/contact",
			variant: "secondary",
			ariaLabel: "Contact support",
		},
	];
	// Función para manejar la navegación al hacer clic en un botón
	const handleNavigation = (path) => {
		navigate(path);
	};

	// Función para obtener los estilos de los botones según el tipo de variante
	const getButtonStyles = (variant) => {
		const baseStyles =
			"px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950";

		if (variant === "primary") {
			return `${baseStyles} bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 focus:ring-purple-500`;
		}

		return `${baseStyles} border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800/50 focus:ring-gray-500`;
	};

	// Retorna los botones de navegación con sus estilos y funciones de navegacion
	return (
		<div className="flex flex-wrap gap-4 justify-center lg:justify-start">
			{navigationButtons.map((button) => (
				<button
					key={button.path}
					className={getButtonStyles(button.variant)}
					onClick={() => handleNavigation(button.path)}
					aria-label={button.ariaLabel}
				>
					{button.label}
				</button>
			))}
		</div>
	);
};

export default LandingNavigationButtons;
