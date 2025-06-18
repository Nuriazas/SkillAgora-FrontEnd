const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const CreateService = {
  create: async (serviceData, token) => {
    console.log(
      "Body que se enviará:",
      JSON.stringify({
        category_name: serviceData.category_name,
        title: serviceData.title,
        description: serviceData.description,
        price: String(serviceData.price),
        place: serviceData.place,
      })
    );
    const response = await fetch(`${API_BASE_URL}/create-service`, {
      method: "POST",
      headers: {
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        category_name: serviceData.category_name,
        title: serviceData.title,
        description: serviceData.description,
        price: String(serviceData.price),
        place: serviceData.place,
      }),
    });

    console.log("Status de respuesta:", response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Error en la petición");
    }

    const responseData = await response.json();
    return responseData;
  },
};
