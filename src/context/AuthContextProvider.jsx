import React from "react";
import { createContext, useState, useEffect } from "react";
import getDataUserLoggedService from "../../src/services/users/getDataUserLoggedService.js";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [userLogged, setUserLogged] = useState(null);

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	}, [token]);

	useEffect(() => {
		const getDataUserLogged = async () => {
			if (!token) {
				setUserLogged(null);
				return;
			}

			try {
				const data = await getDataUserLoggedService({ token });
				setUserLogged(data);
			} catch (error) {
				console.log("Error al obtener datos del usuario:", error);
				if (
					error.message?.includes("401") ||
					error.message?.includes("Unauthorized")
				) {
					setToken(null);
					setUserLogged(null);
				}
			}
		};

		getDataUserLogged();
	}, [token]);

	const logout = () => {
		setToken(null);
		setUserLogged(null);
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				userLogged,
				setUserLogged, // ✅ agregado aquí
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };
