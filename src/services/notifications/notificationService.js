const API_BASE_URL = import.meta.env.VITE_URL_API || "http://localhost:3000";

export const fetchNotifications = async (token) => {
  console.log("\n📡 === fetchNotifications SERVICE ===");
  console.log("🌐 API_BASE_URL:", API_BASE_URL);
  console.log("🔗 URL completa:", `${API_BASE_URL}/notifications/contacts`);
  console.log("🔑 Token:", token ? "✅ Existe" : "❌ No existe");

  try {
    const res = await fetch(`${API_BASE_URL}/notifications/contacts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    console.log("📊 Response status:", res.status);
    console.log("✅ Response ok:", res.ok);
    console.log(
      "📋 Response headers:",
      Object.fromEntries(res.headers.entries())
    );

    if (!res.ok) {
      console.error("❌ Response no OK:");
      console.error("📊 Status:", res.status);
      console.error("📝 StatusText:", res.statusText);

      // Intentar leer el error del servidor
      try {
        const errorText = await res.text();
        console.error("🚨 Error del servidor:", errorText);
      } catch (e) {
        console.error("🚨 No se pudo leer el error del servidor");
      }

      throw new Error(
        `HTTP ${res.status}: No se pudieron obtener las notificaciones`
      );
    }

    const data = await res.json();
    console.log("✅ Data recibida:");
    console.log("🗂️ Data completa:", data);
    console.log("📊 Success:", data.success);
    console.log("📦 Data array:", data.data);
    console.log("🔢 Cantidad de items:", data.data?.length || 0);

    if (data.data && data.data.length > 0) {
      console.log("👀 Primer item como ejemplo:", data.data[0]);
    }

    return data.data;
  } catch (error) {
    console.error("❌ ERROR en fetchNotifications:");
    console.error("🚨 Error completo:", error);
    console.error("📝 Message:", error.message);
    console.error(
      "🌐 URL que falló:",
      `${API_BASE_URL}/notifications/contacts`
    );
    throw error;
  }
};
