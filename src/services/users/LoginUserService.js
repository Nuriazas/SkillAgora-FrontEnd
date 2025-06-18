const API_BASE = "http://localhost:3000";

const ApiService = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error en el login");
    }

    const data = await res.json();
    return data; // aquí debe tener el token
  },
};

export default ApiService;