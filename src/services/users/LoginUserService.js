const API_BASE = "http://localhost:3000";

const ApiService = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });


    if (!res.ok) {
      const errorData = await res.json();
      console.error("❌ Error en login:", errorData);
      throw new Error(errorData.message || "Error en el login");
    }

    const data = await res.json();
    return data;
  },
};

export default ApiService;