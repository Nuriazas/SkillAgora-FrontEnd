const BASE_URL = "http://localhost:3000";

// Función para obtener usuario del JWT
export const getCurrentUserFromToken = () => {
	const token = localStorage.getItem("authToken");
	if (!token) return null;

	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join("")
		);
		return JSON.parse(jsonPayload);
	} catch (error) {
		console.error("Error decoding JWT:", error);
		return null;
	}
};

export const getProfileByName = async (name) => {
	try {
		const token = localStorage.getItem("authToken");
		const headers = {
			"Content-Type": "application/json",
		};

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		const response = await fetch(`${BASE_URL}/users/profile/${name}`, {
			headers,
		});
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
