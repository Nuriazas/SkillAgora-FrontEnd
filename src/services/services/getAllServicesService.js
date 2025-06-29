const BASE_URL = "http://localhost:3000";

export const getAllServices = async () => {
	const response = await fetch(`${BASE_URL}/services`);
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Error al obtener los servicios");
	}

	return data;
};
