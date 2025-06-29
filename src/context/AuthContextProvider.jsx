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
			const currentToken = getToken();

			
			if (!currentToken) {
				setIsAuthenticated(false);
				setUserLogged(null);
				setTokenState(null);
				setLoading(false);
				return;
			}

			if (!isTokenValid(currentToken)) {
				setIsAuthenticated(false);
				setUserLogged(null);
				removeToken();
				setTokenState(null);
				setLoading(false);
				return;
			}

			// Intentar obtener datos del usuario
			const userData = await getDataUserLoggedService();
			
			setUserLogged(userData);
			setTokenState(currentToken);
			setIsAuthenticated(true);
		} catch (error) {
			console.error("❌ Error verificando autenticación:", error);
			if (
				error.message?.includes("401") ||
				error.message?.includes("Unauthorized")
			) {
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
		setToken(newToken);
		setTokenState(newToken);
		setIsAuthenticated(true);
	};

	const handleLoginSuccess = async () => {
		// Después de un login exitoso, verificar el estado de autenticación
		await checkAuthStatus();
	};

	const logout = () => {
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
