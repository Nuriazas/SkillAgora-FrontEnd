const API_BASE = "http://localhost:3000";

const ApiService = {
  login: async (email, password) => {
    console.log("🌐 Enviando petición de login...");
    const res = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("📊 Status de respuesta:", res.status);
    console.log("📋 Headers de respuesta:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      const errorData = await res.json();
      console.error("❌ Error en login:", errorData);
      throw new Error(errorData.message || "Error en el login");
    }

    const data = await res.json();
    console.log("✅ Respuesta del login:", data);
    return data;
  },
};

export default ApiService;