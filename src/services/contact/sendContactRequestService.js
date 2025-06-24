// services/contact/sendContactRequestService.js

const API_BASE_URL = "http://localhost:3000";

export const sendContactRequest = async (serviceId, message, token) => {
  try {
    // Verificar que tenemos token
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    console.log("🚀 Enviando request con:", {
      serviceId, // ✅ CORREGIDO: ahora es serviceId
      message,
      token: token ? `${token.substring(0, 20)}...` : "ausente",
    });

    const response = await fetch(`${API_BASE_URL}/contact/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
      body: JSON.stringify({
        providerId: serviceId, // ✅ CORREGIDO: enviamos serviceId como providerId (el backend lo espera así)
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