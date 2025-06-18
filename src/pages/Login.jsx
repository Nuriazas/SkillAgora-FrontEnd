import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import ApiService from "../services/users/LoginUserService.js";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await ApiService.login(email, password); // Aquí usas tu ApiService
      setToken(data.token); // guardamos token en contexto y localStorage (por useEffect en AuthContextProvider)
      setLoading(false);
      navigate("/"); // rediriges a la página principal u otra
    } catch (e) {
      setError(e.message || "Error al iniciar sesión");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1e1e27]">
      {/* Mensaje de error */}
      {error && (
        <div className="absolute top-4 right-4 z-50 bg-transparent text-white px-4 py-2 rounded-lg shadow-lg max-w-xs text-sm">
          <p className="text-white text-sm text-center">{error}</p>
        </div>
      )}

      <section className="relative z-10 h-screen flex items-start justify-center px-4 pt-4">
        {/* Tarjeta centrada */}
        <article className="bg-[#2C2B36] p-3 rounded-3xl shadow-2xl w-[280px] h-[300px] mx-auto my-12 overflow-hidden flex flex-col justify-between text-xs">
          {/* Header */}
          <h1 className="text-white text-xl font-bold text-center tracking-wide mt-1 mx-4 mb-4">
            <span className="mr-2">🔑</span>SkillAgora
          </h1>

          <section className="text-center space-y-1 bg-[#35343c] rounded-3xl p-4">
            <header>
              <h2 className="m-2 text-white text-sm font-semibold">
                Iniciar Sesión
              </h2>
            </header>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4 px-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl bg-[#2c2c3a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl bg-[#2c2c3a] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-xl font-semibold text-[#064E3B]  transition-colors duration-200 ${
                  loading
                    ? "bg-[#A7F3D0]  cursor-not-allowed"
                    : "bg-[#A7F3D0]  hover:bg-[#35343c]  cursor-pointer"
                }`}
              >
                {loading ? "Cargando..." : "Entrar"}
              </button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </section>
        </article>
      </section>
    </main>
  );
};

export default LoginPage;