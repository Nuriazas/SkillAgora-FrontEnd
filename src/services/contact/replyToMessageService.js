// services/contact/replyToMessageService.js

const API_BASE_URL = "http://localhost:3000";

export const replyToMessage = async (messageId, replyMessage, token) => {
  try {
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    if (!messageId) {
      throw new Error("ID de mensaje requerido");
    }

    if (!replyMessage || !replyMessage.trim()) {
      throw new Error("Mensaje de respuesta requerido");
    }

    console.log("🚀 Enviando respuesta a mensaje:", {
      messageId,
      replyMessage: replyMessage.substring(0, 50) + "...",
      token: token ? `${token.substring(0, 20)}...` : "ausente",
    });

    const response = await fetch(`${API_BASE_URL}/message/${messageId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
      body: JSON.stringify({
        replyMessage: replyMessage.trim(),
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
    console.error("❌ Error completo en replyToMessage:", error);
    throw new Error(
      error.message || "Error al enviar la respuesta"
    );
  }
};