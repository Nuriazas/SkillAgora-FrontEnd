// sendContactRequestService.js

const API_BASE_URL = "http://localhost:3000";

export const sendContactRequest = async (providerId, message, token) => {
	try {
		// Verificar que tenemos token
		if (!token) {
			throw new Error("No hay token de autenticación disponible");
		}

		console.log("🚀 Enviando request con:", {
			providerId,
			message,
			token: token ? `${token.substring(0, 20)}...` : "ausente",
		});

		const response = await fetch(`${API_BASE_URL}/contact/request`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				providerId,
				message,
			}),
		});

		console.log("📡 Respuesta HTTP status:", response.status);
		console.log("📡 Respuesta OK:", response.ok);

		const data = await response.json();
		console.log("📝 Respuesta del servidor:", data);

		if (!response.ok) {
			throw new Error(
				data.message || `Error HTTP ${response.status}: ${response.statusText}`
			);
		}

		return data;
	} catch (error) {
		console.error("❌ Error completo en sendContactRequest:", error);
		throw new Error(
			error.message || "Error al enviar la solicitud de contacto"
		);
	}
};
