import { useState, useEffect } from "react";
import { userApi } from "../services/api/api";

const useUserAuth = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadUserProfile();
	}, []);

	const loadUserProfile = async () => {
		try {
			const tokenData = userApi.getCurrentUserFromToken();

			if (!tokenData) {
				setLoading(false);
				return;
			}

			// Usar datos del token como base
			const baseUserData = {
				id: tokenData.id,
				name: tokenData.name || "Usuario",
				lastName: tokenData.lastName || "",
				email: tokenData.email,
				is_admin: tokenData.is_admin || false,
				// Avatar por defecto
				avatar:
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
			};

			// Establecer datos básicos primero
			setUser(baseUserData);

			// Intentar obtener datos completos del backend si tenemos el nombre
			if (tokenData.name) {
				try {
					console.log("🔍 Cargando perfil completo para:", tokenData.name);
					const profileResponse = await userApi.getProfileByName(
						tokenData.name
					);

					if (
						profileResponse &&
						profileResponse.success &&
						profileResponse.data
					) {
						console.log("✅ Perfil completo obtenido:", profileResponse.data);

						// Combinar datos del token con datos completos del backend
						setUser((prevUser) => ({
							...prevUser,
							...profileResponse.data,
							// Mantener algunos campos del token si el backend no los tiene
							id: prevUser.id,
							is_admin: prevUser.is_admin,
							// Usar avatar del backend si existe, sino mantener el por defecto
							avatar: profileResponse.data.avatar || prevUser.avatar,
							// Combinar nombre completo si viene separado
							fullName:
								profileResponse.data.name && profileResponse.data.lastName
									? `${profileResponse.data.name} ${profileResponse.data.lastName}`
									: prevUser.name,
						}));
					}
				} catch (profileError) {
					console.log(
						"⚠️ No se pudo cargar el perfil completo, usando datos del token:",
						profileError.message
					);
					// No es un error crítico, seguimos con los datos del token
				}
			}
		} catch (error) {
			console.error("❌ Error loading user profile:", error);
			// Si hay error con el token, limpiar todo
			localStorage.removeItem("authToken");
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setUser(null);
		// Recargar para limpiar cualquier estado residual
		window.location.href = "/";
	};

	const refreshProfile = async () => {
		if (user?.name) {
			setLoading(true);
			await loadUserProfile();
		}
	};

	return {
		user,
		loading,
		logout,
		refreshProfile, // Para recargar el perfil después de actualizaciones
	};
};

export default useUserAuth;
