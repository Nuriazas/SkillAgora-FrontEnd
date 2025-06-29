import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

const ValidateUser = () => {
  const { code } = useParams();
  const { t } = useTranslation();
  const [status, setStatus] = useState("pending"); // 'pending', 'success', 'error'
  const [message, setMessage] = useState("");

  useEffect(() => {
    const validate = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users/validate/${code}`);
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(t('validateUser.success', '¡Tu cuenta ha sido activada! Ya puedes iniciar sesión.'));
        } else {
          setStatus("error");
          setMessage(data?.message || t('validateUser.error', 'El enlace no es válido o ya fue usado.'));
        }
      } catch (e) {
        setStatus("error");
        setMessage(t('validateUser.error', 'El enlace no es válido o ya fue usado.'));
      }
    };
    if (code) validate();
  }, [code, t]);

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden font-sans">
      <Header />
      <main className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="bg-gray-900/80 rounded-2xl shadow-2xl border border-gray-800/50 p-10 flex flex-col items-center max-w-md w-full">
          {status === "pending" && (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-6"></div>
              <p className="text-white text-lg font-semibold mb-2">{t('validateUser.validating', 'Validando tu cuenta...')}</p>
            </div>
          )}
          {status === "success" && (
            <div className="flex flex-col items-center">
              <FiCheckCircle className="w-16 h-16 text-green-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">{t('validateUser.activated', '¡Cuenta activada!')}</h2>
              <p className="text-gray-300 mb-6 text-center">{message}</p>
              <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                {t('validateUser.goToLogin', 'Ir a iniciar sesión')}
              </Link>
            </div>
          )}
          {status === "error" && (
            <div className="flex flex-col items-center">
              <FiXCircle className="w-16 h-16 text-red-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">{t('validateUser.errorTitle', 'Error de validación')}</h2>
              <p className="text-gray-300 mb-6 text-center">{message}</p>
              <Link to="/" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                {t('validateUser.goToHome', 'Ir a la página principal')}
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ValidateUser;