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

export const sendFreelancerRequestNotification = async (senderId, senderName) => {
  try {
    const res = await fetch(`${API_BASE_URL}/notifications`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1, // admin
        sender_id: senderId,
        type: "contact_request",
        content: `${senderName} solicita ser freelancer.`,
        status: "contact_request_pending"
      })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error al enviar la notificación");
    }
    return data;
  } catch (error) {
    console.error("Error sending freelancer request notification:", error);
    throw error;
  }
};
