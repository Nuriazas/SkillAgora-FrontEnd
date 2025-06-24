import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import { Background } from "../components/background.jsx";
import { getServiceById } from "../services/api/getServiceById.js";

const ReviewForm = () => {
  const { service_id } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    console.log("serviceId recibido desde URL:", service_id);
    if (!service_id) return;
    getServiceById(service_id)
      .then((response) => {
        console.log("Datos recibidos del servicio:", response);
        setServiceDetails(response.data);
      })
      .catch((err) => setError(err.message));
  }, [service_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);


    try {
        const token = localStorage.getItem("token");
      const res = await fetch(   `http://localhost:3000/services/newreview/${service_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al enviar la review");
      }
      console.log("Review enviada correctamente.");
      setSuccess(true);
      setRating(0);
      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const defaultImage =
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop";

  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden bg-[#070714]">
        <div className="fixed inset-0 z-0">
          <Background />
        </div>
        <div className="relative z-10 container mx-auto p-6 flex flex-col items-center">
          {/* Detalles del servicio */}
          {serviceDetails && (
            <section
              className="relative rounded-3xl shadow-2xl overflow-hidden bg-[#1a1c2d] text-white mb-2"
              style={{ maxWidth: "600px", width: "100%" }}
            >
              {/* Imagen de fondo ocupando la mitad superior */}
              <div
                className="w-full"
                style={{
                  height: "160px",
                  backgroundImage: `url(${defaultImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Avatar centrado, superpuesto */}
              <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-[#1a1c2d] rounded-full w-32 h-32 overflow-hidden bg-gray-700">
                {serviceDetails.user_avatar ? (
                  <img
                    src={serviceDetails.user_avatar}
                    alt={serviceDetails.user_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-4xl text-gray-400">
                    {serviceDetails.user_name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>

              {/* Contenido debajo del avatar */}
              <div className="pt-6 px-6 pb-6 text-center">
                {/* Nombre */}
                <h3 className="text-xl font-bold">
                  {
                    serviceDetails.user_name /* + " " + serviceDetails.user_lastName si tienes */
                  }
                </h3>

                {/* Title */}
                <h2 className="text-2xl mt-4 font-semibold">
                  {serviceDetails.title}
                </h2>

                {/* Bio / Description */}
                <p className="mt-2 text-gray-300">
                  {serviceDetails.description}
                </p>

                {/* Category */}
                {serviceDetails.category_name && (
                  <p className="mt-3 text-sm uppercase tracking-wide text-purple-400 font-semibold">
                    {serviceDetails.category_name}
                  </p>
                )}

                {/* Rating - Placeholder 4 estrellas */}
                <div className="mt-4 flex justify-center space-x-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < 4 ? "fill-current" : "stroke-current"
                      }`}
                      fill={i < 4 ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Price */}
                {serviceDetails.price && (
                  <p className="mt-4 text-lg font-bold text-green-400">
                    ${serviceDetails.price}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Formulario de review */}
          <section
            className="bg-[#1a1c2d] rounded-3xl p-6 shadow-2xl text-white "
            style={{ maxWidth: "600px", width: "100%", marginTop: "0.20rem" }}
          >
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Deja tu reseña
            </h2>

            {error && (
              <p className="bg-red-600 text-white p-2 rounded mb-2 text-center">
                {error}
              </p>
            )}
            {success && (
              <p className="bg-green-600 text-white p-2 rounded mb-4 text-center">
                ¡Reseña enviada correctamente!
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white font-medium">
                  <span className="mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-7 h-7 cursor-pointer transition-all ${
                        star <= rating ? "text-yellow-400" : "text-gray-500"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.449a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.371-2.449a1 1 0 00-1.175 0l-3.371 2.449c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2 rounded-lg font-medium text-white transition-all duration-200
                ${
                  loading
                    ? "bg-[#A7F3D0] cursor-not-allowed text-black"
                    : "bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 hover:from-purple-700 hover:to-blue-700 cursor-pointer"
                }`}
                >
                  {loading ? "Enviando..." : "Enviar Reseña"}
                </button>
              </div>

              <label className="block text-white font-medium">
                Comentario:
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-lg bg-[#070714] border border-gray-600 text-white px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </label>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default ReviewForm;
