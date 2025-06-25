import React, { useEffect, useState } from "react";
import { getFreelancerReviews } from "../../services/notification/reviewsService.js";

const ReviewsList = ({ freelancerId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFreelancerReviews(freelancerId)
      .then((data) => {
        setReviews(data.data.reviews);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [freelancerId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id}>
            <p>
              <strong>{review.reviewer_name}</strong> ({review.rating}⭐)
            </p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;