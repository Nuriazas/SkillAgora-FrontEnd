const getDataUserLoggedService = async ({ token }) => {
	try {
		// 1. Decodificar JWT para obtener los datos del usuario
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join("")
		);
		const tokenData = JSON.parse(jsonPayload);

		console.log("🔍 Token decodificado:", tokenData);

		// 2. Si no tenemos nombre en el token, devolver datos básicos del token
		if (!tokenData.name) {
			console.log("⚠️ No hay nombre en el token, usando datos básicos");
			return {
				id: tokenData.id,
				name: tokenData.name || "Usuario",
				lastName: tokenData.lastName || "",
				email: tokenData.email,
				is_admin: tokenData.is_admin || false,
				avatar:
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
			};
		}

		// 3. Obtener perfil completo del backend usando el nombre del token
		const url = `${
			import.meta.env.VITE_API_URL || "http://localhost:3000"
		}/users/profile/${tokenData.name}`;

		console.log("🌐 Haciendo petición a:", url);

		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		// Verificar si la respuesta es JSON
		const contentType = response.headers.get("content-type");
		if (!contentType || !contentType.includes("application/json")) {
			console.log("⚠️ Respuesta no es JSON, usando datos del token");
			// Si el endpoint falla, usar datos del token
			return {
				id: tokenData.id,
				name: tokenData.name,
				lastName: tokenData.lastName || "",
				email: tokenData.email,
				is_admin: tokenData.is_admin || false,
				avatar:
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
			};
		}

		const json = await response.json();

		if (!response.ok) {
			console.log(
				"⚠️ Error del servidor, usando datos del token:",
				json.message
			);
			// Si hay error, usar datos del token como fallback
			return {
				id: tokenData.id,
				name: tokenData.name,
				lastName: tokenData.lastName || "",
				email: tokenData.email,
				is_admin: tokenData.is_admin || false,
				avatar:
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
			};
		}

		console.log("✅ Perfil completo obtenido:", json.data);

		// 4. Combinar datos del token con datos del perfil
		return {
			// Datos del token (más confiables)
			id: tokenData.id,
			email: tokenData.email,
			is_admin: tokenData.is_admin || false,

			// Datos del perfil (más completos)
			...json.data,

			// Usar avatar del perfil si existe, sino el por defecto
			avatar:
				json.data.avatar ||
				"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",

			// Crear nombre completo si viene separado
			fullName:
				json.data.name && json.data.lastName
					? `${json.data.name} ${json.data.lastName}`
					: json.data.name || tokenData.name,
		};
	} catch (error) {
		console.error("❌ Error en getDataUserLoggedService:", error);
		throw new Error("Error al obtener datos del usuario: " + error.message);
	}
};

export default getDataUserLoggedService;
