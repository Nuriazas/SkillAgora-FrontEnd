const API_BASE_URL = "http://localhost:3000";

export const fetchNotifications = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/notifications/contacts`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al obtener notificaciones");
    }

    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
