// services/contact/sendContactRequestService.js

const API_BASE_URL = "http://localhost:3000";

export const sendContactRequest = async (serviceId, message, token) => {
  try {
    // Verificar que tenemos token
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    console.log("🚀 Enviando request con:", {
      serviceId, 
      message,
      token: token ? `${token.substring(0, 20)}...` : "ausente",
    });

    const response = await fetch(`${API_BASE_URL}/contact/request`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        providerId: serviceId, 
        message,
      }),
    });

    const data = await response.json();

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