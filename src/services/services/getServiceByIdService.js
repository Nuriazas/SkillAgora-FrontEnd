const BASE_URL = "http://localhost:3000";

export const getServiceById = async (id) => {
	const response = await fetch(`${BASE_URL}/service/${id}`);
	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Error al obtener el servicio");
	}

	return data;
};

