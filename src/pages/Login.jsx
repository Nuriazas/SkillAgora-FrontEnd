import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider.jsx";
import ApiService from "../services/users/LoginUserService.js";
import { useNavigate, Link } from "react-router-dom";
import { Background } from "../components/shared/Background/index.jsx";
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import PasswordInput from "../components/shared/UI/PasswordInput";
import { useTranslation } from "react-i18next";
import { getToken } from "../utils/tokenUtils.js";

const LoginPage = () => {
  const { handleLoginSuccess } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("🔄 Iniciando login...");
      const data = await ApiService.login(email, password);
      console.log("📥 Datos recibidos del login:", data);

      // Validar la estructura de la respuesta
      if (!data) {
        throw new Error("No se recibieron datos del servidor");
      }

      // Verificar que el login fue exitoso
      if (data.status !== 'ok' && data.status !== 'success') {
        console.error("❌ Login fallido:", data);
        throw new Error(data.message || "Error en el login");
      }

      console.log("✅ Login exitoso, verificando cookies...");
      
      // Verificar si hay cookies después del login
      const cookies = document.cookie;
      console.log("🍪 Cookies disponibles:", cookies);
      
      // Intentar obtener el token de las cookies
      const token = getToken();
      console.log("🔑 Token obtenido de cookies:", token ? "SÍ" : "NO");

      // El token se maneja automáticamente por las cookies HTTP
      // Notificar al contexto que el login fue exitoso
      handleLoginSuccess();
      console.log("🎉 Login completado, redirigiendo...");

      // Verificar que el usuario esté autenticado antes de redirigir
      setTimeout(() => {
        const finalToken = getToken();
        console.log("🔍 Verificación final - Token:", finalToken ? "SÍ" : "NO");
        if (!finalToken) {
          setError("Error: No se pudo establecer la sesión. Por favor, inténtalo de nuevo.");
          setLoading(false);
        } else {
          setLoading(false);
          navigate("/");
        }
      }, 1000);

    } catch (e) {
      console.error("❌ Error en login:", e);
      setError(e.message || t('login.error'));
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070714]">
      <Background />
      {error && (
        <div className="absolute top-4 right-4 z-50 bg-transparent text-white px-4 py-2 rounded-lg shadow-lg max-w-xs text-sm">
          <p className="text-white text-sm text-center">{error}</p>
        </div>
      )}

      <section className="relative z-10 h-screen flex items-center justify-center px-4 pt-2">
        <article className="bg-[#1a1c2d] p-3 rounded-3xl shadow-2xl w-[500px] h-[600px] mx-auto my-auto overflow-hidden flex flex-col justify-between text-xs">
          <div className="w-full flex justify-center min-h-[60px]">
            <button
              onClick={() => navigate("/")}
              className="text-[60px] font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 w-[400px] h-[100px]"
            >
              SkillAgora
            </button>
          </div>

          <section className="text-center space-y-1 bg-[#070714] rounded-3xl p-10">
            <header>
              <h2 className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent h-[40px] text-[25px] font-bold">
                {t('login.title')}
              </h2>
            </header>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 w-full max-w-ms mx-auto mb-3"
            >
              <input
                type="email"
                placeholder={t('login.email')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-8 py-4 rounded-lg bg-[#1a1c2d] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 text-[15px]"
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.password')}
              />
              <div className="flex justify-between items-center text-white text-[15px]">
                <label className="flex items-center gap-1 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-3 rounded border-gray-400 bg-[#2C2B36] focus:ring-lightCyan"
                  />
                  <span>{t('login.rememberMe')}</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="hover:text-purple-300 transition-colors"
                >
                  {t('login.forgotPassword')}
                </Link>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400  
                hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25 w-full py-2 ${
                  loading
                    ? "bg-[#A7F3D0] cursor-not-allowed"
                    : "bg-[#A7F3D0] hover:bg-[#35343c] cursor-pointer"
                }`}
              >
                {loading ? t('common.loading') : t('login.title')}
              </button>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <p className="text-center text-white text-[13px] mt-1">
                {t('login.orOtherAccounts')}
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
              <p className="text-center text-white text-[13px] mt-1">
                {t('login.noAccount')}{" "}
                <span
                  onClick={() => navigate("/users/register")}
                  className="text-purple-300 hover:underline cursor-pointer"
                >
                  {t('login.signUpLink')}
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