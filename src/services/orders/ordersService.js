const API_BASE_URL = "http://localhost:3000";

// Función para aceptar una orden
export const acceptOrder = async (orderId, token) => {
  try {
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    console.log("✅ Aceptando orden:", orderId);

    const response = await fetch(`${API_BASE_URL}/orders/accept/${orderId}`, {
      method: "PUT",
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
    console.error("❌ Error al aceptar orden:", error);
    throw new Error(error.message || "Error al aceptar la orden");
  }
};

// Función para obtener detalles de una orden específica
export const getOrderById = async (orderId, token) => {
  try {
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    console.log("🔍 Obteniendo detalles de orden:", orderId);

    const response = await fetch(`${API_BASE_URL}/orders/getById/${orderId}`, {
      method: "GET",
      credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    console.log("📝 Detalles de orden:", data);

    if (!response.ok) {
      throw new Error(
        data.message || `Error HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data.data;
  } catch (error) {
    console.error("❌ Error al obtener orden:", error);
    throw new Error(error.message || "Error al obtener detalles de la orden");
  }
};

// Función para actualizar estado de una orden
export const updateOrder = async (orderId, updateData, token) => {
  try {
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    console.log("🔄 Actualizando orden:", orderId, updateData);

    const response = await fetch(`${API_BASE_URL}/orders/update/${orderId}`, {
      method: "PUT",
      credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();
    console.log("📝 Orden actualizada:", data);

    if (!response.ok) {
      throw new Error(
        data.message || `Error HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("❌ Error al actualizar orden:", error);
    throw new Error(error.message || "Error al actualizar la orden");
  }
};

// Función para marcar orden como entregada
export const deliverOrder = async (orderId, deliveryUrl, token) => {
  try {
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    console.log("📦 Marcando orden como entregada:", orderId);

    const response = await fetch(
      `${API_BASE_URL}/orders/delivered/${orderId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deliveryUrl }),
      }
    );

    const data = await response.json();
    console.log("📝 Orden entregada:", data);

    if (!response.ok) {
      throw new Error(
        data.message || `Error HTTP ${response.status}: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("❌ Error al entregar orden:", error);
    throw new Error(error.message || "Error al marcar orden como entregada");
  }
};

// Re-exportar funciones existentes
export { createOrder, checkOrderStatus } from "./createOrderService.js";
