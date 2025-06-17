import React, { useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

/**
 * Dropdown del usuario logueado con opciones de perfil y logout
 */
const UserDropdown = ({ user, isOpen, onToggle, onLogout }) => {
	// Cerrar dropdown al hacer click fuera
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (isOpen && !e.target.closest("[data-dropdown]")) {
				onToggle();
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isOpen, onToggle]);

	// Handlers para las opciones del menú
	const handleProfileClick = () => {
		console.log("Ir a perfil");
		onToggle();
	};

	const handleServicesClick = () => {
		console.log("Ir a mis servicios");
		onToggle();
	};

	const handleOrdersClick = () => {
		console.log("Ir a órdenes");
		onToggle();
	};

	const handleSettingsClick = () => {
		console.log("Ir a configuración");
		onToggle();
	};

	return (
		<div className="relative" data-dropdown>
			<button
				onClick={onToggle}
				className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-800/50 transition-all duration-200"
				aria-expanded={isOpen}
				aria-haspopup="true"
			>
				<img
					src={user.avatar}
					alt="Perfil"
					className="w-8 h-8 rounded-full border-2 border-purple-500/60 ring-2 ring-purple-500/20"
				/>
				<div className="flex flex-col text-left">
					<span className="text-sm font-medium text-white">
						{user.name} {user.lastName}
					</span>
					<span className="text-xs text-gray-400">{user.email}</span>
				</div>
				<FiChevronDown
					className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 py-2 z-50">
					<button
						onClick={handleProfileClick}
						className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
					>
						Mi Perfil
					</button>
					<button
						onClick={handleServicesClick}
						className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
					>
						Mis Servicios
					</button>
					<button
						onClick={handleOrdersClick}
						className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
					>
						Órdenes
					</button>
					<button
						onClick={handleSettingsClick}
						className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
					>
						Configuración
					</button>
					<hr className="my-2 border-gray-700/50" />
					<button
						onClick={onLogout}
						className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
					>
						Cerrar Sesión
					</button>
				</div>
			)}
		</div>
	);
};

export default UserDropdown;
