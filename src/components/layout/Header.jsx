import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider.jsx";
import UserDropdown from "../shared/navigation/UserDropDown.jsx";
import { LanguageToggle } from "../shared/navigation/LanguageToggle.jsx";
import { useTranslation } from "react-i18next";
import { FiSearch, FiX, FiLoader } from "react-icons/fi";

// componente header que muestra la barra de navegación superior con enlaces y dropdown de usuario

const Header = ({ showStickySearch = false, stickyValue = '', onStickyInput }) => {	
	// estados para manejar el dropdown y la autenticación del usuario
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { token, userLogged, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [stickyLoading, setStickyLoading] = useState(false);

	// Estado de carga - mientras se obtienen datos del usuario
	if (token && userLogged === null) {
		return (
			<header className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 fixed top-0 left-0 right-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo de la aplicación (por añadir!!!) */}
						<div className="flex items-center space-x-4">
							<button
								onClick={() => navigate("/")}
								className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
							>
								SkillAgora
							</button>
						</div>

						{/* Skeleton loader para el área de usuario */}
						<div className="animate-pulse" aria-label="Cargando...">
							<div className="h-8 w-32 bg-gray-700 rounded"></div>
						</div>
					</div>
				</div>
			</header>
		);
	}

	// Handler para toggle del dropdown
	const handleDropdownToggle = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Handler para cerrar dropdown al hacer logout
	const handleLogout = () => {
		setIsDropdownOpen(false);
		logout();
		navigate("/");
	};

	// Handler para cerrar dropdown al navegar
	const handleNavigate = (path) => {
		setIsDropdownOpen(false);
		navigate(path);
	};

	// Handler para Enter en sticky input
	const handleStickyKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			setStickyLoading(true);
			setTimeout(() => setStickyLoading(false), 1000); // Simula loading 1s
		}
	};

	const handleStickyClear = () => {
		onStickyInput({ target: { value: '' } });
	};
	
	return (	// retorna el header con la navegacion central y, el dropdown de usuario segun el estado de autenticación
		<header className="bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 fixed top-0 left-0 right-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
				<div className="flex justify-between items-center h-16">
					{/* Logo/Marca */}
					<div className="flex items-center space-x-4">
						<button
							onClick={() => navigate("/")}
							className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
						>
							SkillAgora
						</button>
					</div>

					{/* Navegación central */}
					<div className="flex-1 flex justify-center">
						<nav className="hidden md:flex items-center space-x-8">
							<button
								onClick={() => navigate("/services")}
								className="text-gray-300 hover:text-white transition-colors duration-200"
							>
								{t("header.services", "Services")}
							</button>
							<button
								onClick={() => navigate("/freelancers")}
								className="text-gray-300 hover:text-white transition-colors duration-200"
							>
								{t("header.freelancers", "Freelancers")}
							</button>
						</nav>
					</div>

					{/* Área de autenticación y botón de idioma alineados a la derecha */}
					<div className="flex items-center space-x-4">
						{userLogged ? (
							<UserDropdown
								user={userLogged}
								isOpen={isDropdownOpen}
								onToggle={handleDropdownToggle}
								onLogout={handleLogout}
								onNavigate={handleNavigate}
							/>
						) : (
							<div className="flex items-center space-x-4">
								<button
									className="text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-800/50"
									onClick={() => navigate("/login")}
									aria-label={t("header.signInAria", "Iniciar sesión en SkillAgora")}
								>
									{t("header.signIn", "Sign In")}
								</button>
								<button
									className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25"
									onClick={() => navigate("/users/register")}
									aria-label={t("header.signUpAria", "Registrarse en SkillAgora")}
								>
									{t("header.signUp", "Sign Up")}
								</button>
							</div>
						)}
						<div className="pl-4">
							<LanguageToggle />
						</div>
					</div>

					{/* Sticky search input absoluto a la derecha */}
					{showStickySearch && (
						<div className="absolute right-96 top-1/2 -translate-y-1/2 w-full max-w-[210px] z-50">
							<div className="relative">
								<span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
									<FiSearch className="w-4 h-4" />
								</span>
								<input
									type="text"
									value={stickyValue}
									onChange={onStickyInput}
									onKeyDown={handleStickyKeyDown}
									placeholder={t('search.placeholder', 'Search by name, specialty or location...')}
									className="w-full pl-8 pr-8 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm shadow"
								/>
								{/* Botón de limpiar */}
								{stickyValue && !stickyLoading && (
									<button
										type="button"
										onClick={handleStickyClear}
										className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 focus:outline-none"
										aria-label="Clear search"
									>
										<FiX className="w-4 h-4" />
									</button>
								)}
								{/* Loading spinner */}
								{stickyLoading && (
									<span className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-purple-400">
										<FiLoader className="w-4 h-4" />
									</span>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
