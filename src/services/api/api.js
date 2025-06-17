import { getAllServices } from "./getAllServicesService.js";
import { getServiceById } from "./getServiceDetailsService.js";
import {
	getProfileByName,
	getCurrentUserFromToken,
} from "./getProfileByNameService.js";
import { getFeaturedServices } from "./getFeaturedServicesService.js";
import {
	getFilteredServices,
	getCategories,
} from "./getFilteredServicesService.js";

// Exportamos como objetos para mantener compatibilidad
export const servicesApi = {
	getAllServices,
	getServiceById,
	getFeaturedServices,
	getFilteredServices,
	getCategories,
};

export const userApi = {
	getProfileByName,
	getCurrentUserFromToken,
};

// Para mantener compatibilidad con contactApi (solo la función que usas)
export const contactApi = {
	sendContactRequest: async (data) => {
		try {
			const token = localStorage.getItem("authToken");
			const headers = {
				"Content-Type": "application/json",
			};

			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			const response = await fetch("http://localhost:3000/contact/request", {
				method: "POST",
				headers,
				body: JSON.stringify(data),
			});
			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || "Something went wrong");
			}

			return result;
		} catch (error) {
			console.error("API Error:", error);
			throw error;
		}
	},
};
