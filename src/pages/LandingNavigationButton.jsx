import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Componente LandingNavigationButtons - Botones de navegación principales para el Landing
 * Proporciona acceso rápido a las secciones principales de la aplicación
 */
const LandingNavigationButtons = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const navigationButtons = [
		{
			label: t('landingNav.browseServices'),
			path: "/services",
			variant: "primary",
			ariaLabel: t('landingNav.browseServicesAria'),
		},
		{
			label: t('landingNav.findFreelancers'),
			path: "/freelancers",
			variant: "secondary",
			ariaLabel: t('landingNav.findFreelancersAria'),
		},
		{
			label: t('landingNav.postJob'),
			path: "/jobs/create",
			variant: "secondary",
			ariaLabel: t('landingNav.postJobAria'),
		},
		{
			label: t('landingNav.contactUs'),
			path: "/contact",
			variant: "secondary",
			ariaLabel: t('landingNav.contactUsAria'),
		},
	];

	const handleNavigation = (path) => {
		navigate(path);
	};

	const getButtonStyles = (variant) => {
		const baseStyles =
			"px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950";

		if (variant === "primary") {
			return `${baseStyles} bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-purple-500/25 focus:ring-purple-500`;
		}

		return `${baseStyles} border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800/50 focus:ring-gray-500`;
	};

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
