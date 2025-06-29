const API_BASE_URL = "http://localhost:3000";

export const createOrder = async (serviceId, token) => {
  try {
    // Verificar que tenemos token
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    const response = await fetch(`${API_BASE_URL}/orders/create/${serviceId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Error HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("❌ Error completo en createOrder:", error);
    throw new Error(error.message || "Error al crear la orden");
  }
};

// NUEVA FUNCIÓN: Verificar estado de orden para un servicio
export const checkOrderStatus = async (serviceId, token) => {
  try {
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    console.log("🔍 Verificando estado de orden para servicio:", serviceId);

    const response = await fetch(
      `${API_BASE_URL}/orders/checkStatus/${serviceId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    

    if (!response.ok) {
      throw new Error(
        data.message || `Error HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data.data; // Retorna { hasActiveOrder, orderStatus, orderId }
  } catch (error) {
    console.error("❌ Error al verificar estado de orden:", error);
    throw new Error(error.message || "Error al verificar estado de orden");
  }
};
