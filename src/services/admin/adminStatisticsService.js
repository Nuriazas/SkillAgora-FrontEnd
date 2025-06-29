const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAdminStatistics = async () => {
  try {
    
    const response = await fetch(`${API_BASE_URL}/admin/statistics`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
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

    return data;
  } catch (error) {
    console.error("❌ Error obteniendo estadísticas de admin:", error);
    throw new Error(error.message || "Error al obtener estadísticas del sistema");
  }
};