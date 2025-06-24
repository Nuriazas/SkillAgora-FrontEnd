const API_URL_VITE = 'http://localhost:3000/';


export const createReview = async ({ order_id, rating, comment, token, status }) => {
  const res = await fetch(`${API_URL_VITE}/services/newreview/${service_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ order_id: order_id, rating, comment }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create review");
  }
  return res.json();
};

export const getFreelancerReviews = async (freelancer_id) => {
  const res = await fetch(`${API_URL_VITE}/freelancer/${freelancer_id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return res.json();
};