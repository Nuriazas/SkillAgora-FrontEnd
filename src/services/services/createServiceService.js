import { getToken } from "../../utils/tokenUtils.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const CreateService = {
  create: async (serviceData) => {
    const token = getToken();
    
    if (!token) {
      throw new Error("No hay token de autenticación disponible");
    }

    const formData = new FormData();
    formData.append("category_name", serviceData.category_name);
    formData.append("title", serviceData.title);
    formData.append("description", serviceData.description);
    formData.append("price", serviceData.price);
    formData.append("place", serviceData.place);
    formData.append("img", serviceData.img);

    const response = await fetch(`${API_BASE_URL}/create-service`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error("Error del backend:", error);
      throw new Error(
        error.message || `Error ${response.status}: ${response.statusText}`
      );
    }

    const responseData = await response.json();
    return responseData;
  },
};
