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

    const response = await fetch(`${API_BASE_URL}/message/${messageId}/reply`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
      body: JSON.stringify({
        replyMessage: replyMessage.trim(),
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
    console.error("❌ Error completo en replyToMessage:", error);
    throw new Error(
      error.message || "Error al enviar la respuesta"
    );
  }
};