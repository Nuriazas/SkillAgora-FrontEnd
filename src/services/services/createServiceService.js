const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const CreateService = {
	create: async (serviceData, token) => {
		const bodyData = {
			category_name: serviceData.category_name,
			title: serviceData.title,
			description: serviceData.description,
			price: parseInt(serviceData.price),
			place: serviceData.place,
		};

		console.log("Body que se enviará:", JSON.stringify(bodyData));
		console.log("Token que se enviará:", token);
		console.log("URL completa:", `${API_BASE_URL}/create-service`);

		const response = await fetch(`${API_BASE_URL}/create-service`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json", // ← AÑADIDO: faltaba este header
				Authorization: `Bearer ${token}`, // ← CORREGIDO: mayúsculas correctas
			},
			body: JSON.stringify(bodyData),
		});

		console.log("Status de respuesta:", response.status);

		if (!response.ok) {
			const error = await response.json().catch(() => ({}));
			console.error("Error del backend:", error);
			throw new Error(
				error.message || `Error ${response.status}: ${response.statusText}`
			);
		}

		const responseData = await response.json();
		return responseData;
	},
};
