import React, { useState } from "react";
import { createReview } from "../../services/notification/reviewsService.js";

const CreateReviewForm = ({ orderId, token, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createReview({ order_id: orderId, rating, comment,  token });
      setRating(5);
      setComment("");
      s
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit Review"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default CreateReviewForm;