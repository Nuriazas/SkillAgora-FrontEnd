const API_URL_VITE = "http://localhost:3000";

export const createReview = async (service_id, reviewData) => {
  try {
    const res = await fetch(`${API_URL_VITE}/services/newreview/${service_id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al crear la reseña");
    }

    return data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const getFreelancerReviews = async (freelancer_id) => {
  try {
    const res = await fetch(`${API_URL_VITE}/freelancer/${freelancer_id}`, {
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al obtener las reseñas");
    }

    return data;
  } catch (error) {
    console.error("Error fetching freelancer reviews:", error);
    throw error;
  }
};