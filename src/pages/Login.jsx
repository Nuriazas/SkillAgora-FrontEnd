import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import ApiService from "../services/users/LoginUserService.js"; // importa tu servicio real de login
import { useNavigate } from "react-router-dom";
import { Background } from "../components/background.jsx";
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

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
      setToken(data.data.token); // guardamos token en contexto y localStorage (por useEffect en AuthContextProvider)
      setLoading(false);
      navigate("/"); // rediriges a la página principal u otra
    } catch (e) {
      setError(e.message || "Error al iniciar sesión");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070714]">
      <Background />
      {/* Mensaje de error */}
      {error && (
        <div className="absolute top-4 right-4 z-50 bg-transparent text-white px-4 py-2 rounded-lg shadow-lg max-w-xs text-sm">
          <p className="text-white text-sm text-center">{error}</p>
        </div>
      )}

      <section className="relative z-10 h-screen flex items-center justify-center px-4 pt-2">
        {/* Tarjeta centrada */}
        <article className="bg-[#1a1c2d] p-3 rounded-3xl shadow-2xl w-[500px] h-[600px] mx-auto my-auto overflow-hidden flex flex-col justify-between text-xs">
          {/* Header */}
          <div className="w-full flex justify-center  min-h-[60px] w-full  ">
            <button
              onClick={() => navigate("/")}
              className="text-[60px] font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 w-[400px] h-[100px] "
            >
              SkillAgora
            </button>
          </div>

          <section className="text-center space-y-1 bg-[#070714] rounded-3xl p-10 ">
            <header>
              <h2 className=" bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent h-[40px] text-[25px] font-bold">
                Sign in
              </h2>
            </header>

            {/* Formulario */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 w-full max-w-ms mx-auto mb-3"
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-8 py-4 rounded-lg bg-[#1a1c2d] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300
                text-[15px]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-8 py-4 rounded-lg bg-[#1a1c2d] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300
                text-[15px]"
              />
              <div className="flex justify-between items-center text-white text-[15px]">
                <label className="flex items-center gap-1 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-3 rounded border-gray-400 bg-[#2C2B36] focus:ring-lightCyan"
                  />
                  <span>Remember me?</span>
                </label>
                <a href="#" className="hover:text-purple-300 transition-colors">
                  Forgot Password
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400  
                hover:from-purple-700 hover:to-blue-700 text-white  rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25 w-full py-2 ${
                  loading
                    ? "bg-[#A7F3D0]  cursor-not-allowed"
                    : "bg-[#A7F3D0]  hover:bg-[#35343c]  cursor-pointer"
                }`}
              >
                {loading ? "Cargando..." : "Sign in"}
              </button>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <p className="text-center text-white text-[13px] mt-1">
                or sign in with other accounts?
              </p>
              <div className="flex justify-center gap-3 mt-1 text-white text-base cursor-pointer">
                <FaGoogle
                  size={30}
                  className="hover:text-purple-300 transition-colors"
                />
                <FaFacebookF
                  size={30}
                  className="hover:text-purple-300 transition-colors"
                />
                <FaInstagram
                  size={30}
                  className="hover:text-purple-300 transition-colors"
                />
                <FaLinkedinIn
                  size={30}
                  className="hover:text-purple-300 transition-colors"
                />
              </div>
              <p className="text-center text-white text-[13px] mt-1 ">
                Don't have an account yet?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-purple-300 hover:underline"
                >
                  Sign up for an account.
                </span>
              </p>
            </form>
          </section>
        </article>
      </section>
    </main>
  );
};

export default LoginPage;
