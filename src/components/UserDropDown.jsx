import React, { useEffect } from "react";
import {
	FiChevronDown,
	FiUser,
	FiBriefcase,
	FiShoppingBag,
	FiSettings,
	FiLogOut,
} from "react-icons/fi";

/**
 * Dropdown del usuario logueado con opciones de perfil y logout
 */
const UserDropdown = ({ user, isOpen, onToggle, onLogout, onNavigate }) => {
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
		const profileName = user.name || user.fullName || "profile";
		onNavigate(`/users/profile/${profileName}`);
	};

	const handleServicesClick = () => {
		onNavigate("/services");
	};

	const handleOrdersClick = () => {
		onNavigate("/my-orders");
	};

	const handleSettingsClick = () => {
		onNavigate("/settings");
	};

	// Determinar el nombre a mostrar
	const displayName =
		user.fullName ||
		`${user.name || ""} ${user.lastName || ""}`.trim() ||
		"Usuario";

	return (
		<div className="relative" data-dropdown>
			<button
				onClick={onToggle}
				className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-800/50 transition-all duration-200 group"
				aria-expanded={isOpen}
				aria-haspopup="true"
			>
				<img
					src={user.avatar}
					alt={`${displayName}'s profile picture`}
					className="w-8 h-8 rounded-full border-2 border-purple-500/60 ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-200"
					onError={(e) => {
						e.target.src =
							"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face";
					}}
				/>
				<div className="hidden sm:flex flex-col text-left">
					<span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
						{displayName}
					</span>
					<span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
						{user.email}
					</span>
				</div>
				<FiChevronDown
					className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute right-0 mt-2 w-52 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
					{/* Header del dropdown */}
					<div className="px-4 py-3 border-b border-gray-700/50">
						<div className="flex items-center space-x-3">
							<img
								src={user.avatar}
								alt={displayName}
								className="w-10 h-10 rounded-full border-2 border-purple-500/60"
								onError={(e) => {
									e.target.src =
										"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face";
								}}
							/>
							<div>
								<div className="text-sm font-medium text-white">
									{displayName}
								</div>
								<div className="text-xs text-gray-400">{user.email}</div>
							</div>
						</div>
					</div>

					{/* Opciones del menú */}
					<div className="py-2">
						<button
							onClick={handleProfileClick}
							className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors group"
						>
							<FiUser className="w-4 h-4 mr-3 text-gray-400 group-hover:text-purple-400" />
							My Profile
						</button>
						<button
							onClick={handleServicesClick}
							className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors group"
						>
							<FiBriefcase className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-400" />
							My Services
						</button>
						<button
							onClick={handleOrdersClick}
							className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors group"
						>
							<FiShoppingBag className="w-4 h-4 mr-3 text-gray-400 group-hover:text-green-400" />
							Orders
						</button>
						<button
							onClick={handleSettingsClick}
							className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors group"
						>
							<FiSettings className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-300" />
							Settings
						</button>
					</div>

					{/* Logout */}
					<hr className="my-2 border-gray-700/50" />
					<button
						onClick={onLogout}
						className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors group"
					>
						<FiLogOut className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-300" />
						Sign Out
					</button>
				</div>
			)}
		</div>
	);
};

export default UserDropdown;
