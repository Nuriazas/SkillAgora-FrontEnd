import React, { useState } from "react";
import UserDropdown from "./UserDropDown.jsx";
import useUserAuth from "../hooks/useUserAuth";
import { useNavigate } from "react-router";

/**
 * Componente Header principal de la aplicación
 * Maneja la navegación principal y el estado de autenticación del usuario
 */
const Header = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { user, loading, logout } = useUserAuth();
	const navigate = useNavigate();
	// Estado de carga - muestra skeleton mientras se verifica la autenticación
	if (loading) {
		return (
			<header className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						{/* Logo de la aplicación */}
						<div className="flex items-center space-x-4">
							<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
								SkillAgora
							</h1>
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
	};

	return (
		<header className="bg-gray-900/60 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo/Marca */}
					<div className="flex items-center space-x-4">
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
							SkillAgora
						</h1>
					</div>

					{/* Área de autenticación */}
					{user ? (
						// Usuario autenticado - mostrar dropdown
						<UserDropdown
							user={user}
							isOpen={isDropdownOpen}
							onToggle={handleDropdownToggle}
							onLogout={handleLogout}
						/>
					) : (
						// Usuario no autenticado - mostrar botón de login
						<div className="flex items-center space-x-4">
							<button
								className="text-gray-300 hover:text-white transition-colors"
								onClick={() => {
									// TODO: Implementar navegación a página de login
									navigate("/login")
								}}
								aria-label="Iniciar sesión en SkillAgora"
							>
								Iniciar Sesión
							</button>
							<button 
								className="text-gray-300 hover:text-white transition-colors"
								onClick={() => {
									// TODO: Implementar navegación a página de login
									navigate("/users/register")
								}}
								aria-label="Regístrate en SkillAgora">

								Regístrate
							</button>
						</div>
						
						
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
