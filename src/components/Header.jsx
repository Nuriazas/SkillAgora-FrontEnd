import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import UserDropdown from "./UserDropDown.jsx";

/**
 * Componente Header principal de la aplicación
 * Usa AuthContext en lugar de useUserAuth para consistencia
 */
const Header = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { token, userLogged, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	// Estado de carga - mientras se obtienen datos del usuario
	if (token && userLogged === null) {
		return (
			<header className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo de la aplicación */}
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

	return (
		<header className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
					<nav className="hidden md:flex items-center space-x-8">
						<button
							onClick={() => navigate("/services")}
							className="text-gray-300 hover:text-white transition-colors duration-200"
						>
							Services
						</button>
						<button
							onClick={() => navigate("/freelancers")}
							className="text-gray-300 hover:text-white transition-colors duration-200"
						>
							Freelancers
						</button>
					</nav>

					{/* Área de autenticación */}
					{userLogged ? (
						// Usuario autenticado - mostrar dropdown con datos del perfil
						<UserDropdown
							user={userLogged}
							isOpen={isDropdownOpen}
							onToggle={handleDropdownToggle}
							onLogout={handleLogout}
							onNavigate={handleNavigate}
						/>
					) : (
						// Usuario no autenticado - mostrar botones de login y registro
						<div className="flex items-center space-x-4">
							<button
								className="text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-800/50"
								onClick={() => navigate("/login")}
								aria-label="Iniciar sesión en SkillAgora"
							>
								Sign In
							</button>
							<button
								className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25"
								onClick={() => navigate("/users/register")}
								aria-label="Registrarse en SkillAgora"
							>
								Sign Up
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
