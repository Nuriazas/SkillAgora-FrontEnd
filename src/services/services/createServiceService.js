const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const CreateService = {
	create: async (serviceData, token) => {
		const formData = new FormData();
		formData.append('category_name', serviceData.category_name);
		formData.append('title', serviceData.title);
		formData.append('description', serviceData.description);
		formData.append('price', serviceData.price);
		formData.append('place', serviceData.place);
		formData.append('img', serviceData.img);
		

		console.log("DATOS DE EL CREAR SERVICIO QUE SE MANDAN AL BACK:", serviceData);

		const response = await fetch(`${API_BASE_URL}/create-service`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
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
