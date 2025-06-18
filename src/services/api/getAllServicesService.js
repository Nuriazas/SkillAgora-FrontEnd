const BASE_URL = "http://localhost:3000";

export const getAllServices = async () => {
	try {
		const response = await fetch(`${BASE_URL}/services`);
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
