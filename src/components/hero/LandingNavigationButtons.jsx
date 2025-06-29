import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContextProvider.jsx";
import RoleWarningModal from "../shared/modals/RoleWarningModal.jsx";

// componente para los botones de navegación en la página de inicio

const LandingNavigationButtons = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { userLogged } = useContext(AuthContext);
	const [showModal, setShowModal] = useState(false);

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
			label: t("landingNav.postService"),
			path: "/services/create",
			variant: "secondary",
			ariaLabel: t("landingNav.postServiceAria"),
			isPostService: true,
		},
		{
			label: t('landingNav.contactUs'),
			path: "/contact",
			variant: "secondary",
			ariaLabel: t('landingNav.contactUsAria'),
		},
	];

	// Función para manejar la navegación al hacer clic en un botón
	const handleNavigation = (button) => {
		if (button.isPostService) {
			if (userLogged && userLogged.role === "client") {
				setShowModal(true);
				return;
			}
		}
		navigate(button.path);
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
		<>
			<div className="flex flex-wrap gap-4 justify-center lg:justify-start">
				{navigationButtons.map((button) => {
					const buttonStyles = getButtonStyles(button.variant);
					return (
						<button
							key={button.path}
							className={buttonStyles}
							onClick={() => handleNavigation(button)}
							aria-label={button.ariaLabel}
						>
							{button.label}
						</button>
					);
				})}
			</div>
			<RoleWarningModal open={showModal} onClose={() => setShowModal(false)} />
		</>
	);
};

export default LandingNavigationButtons;
