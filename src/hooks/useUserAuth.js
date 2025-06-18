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

			// Solo usar datos del token por ahora
			setUser({
				id: tokenData.id,
				name: tokenData.name || "Usuario",
				lastName: tokenData.lastName || "",
				email: tokenData.email,
				is_admin: tokenData.is_admin || false,
				avatar:
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
			});

			// TODO: Arreglar luego para traer datos completos del backend
			/*
			try {
				const profileResponse = await userApi.getProfileByName(???);
				if (profileResponse && profileResponse.data) {
					setUser((prev) => ({
						...prev,
						...profileResponse.data,
						avatar: profileResponse.data.avatar || prev.avatar,
					}));
				}
			} catch (error) {
				console.log("Could not load full profile, using token data");
			}
			*/
		} catch (error) {
			console.error("Error loading user profile:", error);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setUser(null);
		window.location.reload();
	};

	return { user, loading, logout };
};

export default useUserAuth;
