import React from "react";
import { createContext, useState, useEffect } from "react";
import getDataUserLoggedService from "../../src/services/users/getDataUserLoggedService.js";
import { getToken, setToken, removeToken, isTokenValid } from "../utils/tokenUtils.js";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	
	const [userLogged, setUserLogged] = useState(null);
	const [token, setTokenState] = useState(getToken());
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	// Función para verificar si el usuario está autenticado
	const checkAuthStatus = async () => {
		try {
			console.log("🔍 Verificando estado de autenticación...");
			const currentToken = getToken();
			console.log("🔑 Token actual:", currentToken ? "SÍ" : "NO");
			
			if (!currentToken) {
				console.log("❌ No hay token, usuario no autenticado");
				setIsAuthenticated(false);
				setUserLogged(null);
				setTokenState(null);
				setLoading(false);
				return;
			}

			if (!isTokenValid(currentToken)) {
				console.log("❌ Token expirado o inválido");
				setIsAuthenticated(false);
				setUserLogged(null);
				removeToken();
				setTokenState(null);
				setLoading(false);
				return;
			}

			console.log("✅ Token válido, obteniendo datos del usuario...");
			// Intentar obtener datos del usuario
			const userData = await getDataUserLoggedService();
			console.log("👤 Datos del usuario obtenidos:", userData);
			
			setUserLogged(userData);
			setTokenState(currentToken);
			setIsAuthenticated(true);
			console.log("✅ Usuario autenticado correctamente");
		} catch (error) {
			console.error("❌ Error verificando autenticación:", error);
			if (
				error.message?.includes("401") ||
				error.message?.includes("Unauthorized")
			) {
				console.log("🚫 Usuario no autorizado, limpiando estado");
				setIsAuthenticated(false);
				setUserLogged(null);
				removeToken();
				setTokenState(null);
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const handleSetToken = (newToken) => {
		console.log("🔧 Estableciendo token manualmente:", newToken ? "SÍ" : "NO");
		setToken(newToken);
		setTokenState(newToken);
		setIsAuthenticated(true);
	};

	const handleLoginSuccess = async () => {
		console.log("🎉 Login exitoso, verificando estado...");
		// Después de un login exitoso, verificar el estado de autenticación
		await checkAuthStatus();
	};

	const logout = () => {
		console.log("🚪 Cerrando sesión...");
		setUserLogged(null);
		setIsAuthenticated(false);
		removeToken();
		setTokenState(null);
	};

	return (
		<AuthContext.Provider
			value={{
				userLogged,
				setUserLogged,
				token,
				setToken: handleSetToken,
				handleLoginSuccess,
				logout,
				isAuthenticated,
				loading,
				checkAuthStatus,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };
