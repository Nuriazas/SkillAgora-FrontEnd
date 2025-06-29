const BASE_URL = "http://localhost:3000";

export const getFilteredServices = async (filters) => {
	try {
		const queryParams = new URLSearchParams();
		Object.entries(filters).forEach(([key, value]) => {
			if (value && value !== "") {
				queryParams.append(key, value);
			}
		});

		const response = await fetch(
			`${BASE_URL}/services/filters?${queryParams.toString()}`
		);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Something went wrong");
		}

		return data;
	} catch (error) {
		console.error("API Error:", error);
		throw error;
	}
};

export const getCategories = async () => {
	try {
		const response = await fetch(`${BASE_URL}/services/categories`);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Error al obtener las categorías");
		}

		return data;
	} catch (error) {
		console.error("API Error:", error);
		throw error;
	}
};
