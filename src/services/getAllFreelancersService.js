const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const freelancerService = {
	getAll: async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/users/freelancers`);
			if (!response.ok) {
				const error = await response.json().catch(() => ({}));
				throw new Error(error.message || "Error en la petición");
			}
			const serviceData = await response.json();
			return serviceData.data;
		} catch (error) {
			console.error("Error en getAll:", error);
			throw error;
		}
	},

	getById: async (id) => {
		try {
			const response = await fetch(`${API_BASE_URL}/users/freelancers/${id}`);
			if (!response.ok) {
				const error = await response.json().catch(() => ({}));
				throw new Error(error.message || "Error al obtener freelancer");
			}
			const serviceData = await response.json();
			return serviceData.data;
		} catch (error) {
			console.error("Error en getById:", error);
			throw error;
		}
	},
};
