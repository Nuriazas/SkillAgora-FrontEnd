const getDataUserLoggedService = async () => {
	try {
		const url = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/users/profile`;

		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const contentType = response.headers.get("content-type");
		if (!contentType || !contentType.includes("application/json")) {
			throw new Error("La respuesta no es JSON");
		}

		const json = await response.json();

		if (!response.ok) {
			throw new Error(json.message || "Error al obtener perfil");
		}

		return json.data;
	} catch (error) {
		throw new Error("Error al obtener datos del usuario: " + error.message);
	}
};

export default getDataUserLoggedService;
