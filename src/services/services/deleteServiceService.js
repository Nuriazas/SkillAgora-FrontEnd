// services/services/deleteServiceService.js

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const deleteServiceService = async (serviceId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/service/delete/${serviceId}`, {
      method: "PUT", // ✅ Cambiar a PUT porque tu endpoint usa PUT
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("La respuesta no es JSON");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Error HTTP ${response.status}: ${response.statusText}`);
    }

    return { response, data };
  } catch (error) {
    console.error("❌ Error eliminando servicio:", error);
    throw new Error(error.message || "Error al eliminar el servicio");
  }
};

export default deleteServiceService;