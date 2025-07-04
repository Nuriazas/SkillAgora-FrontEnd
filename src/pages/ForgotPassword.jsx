import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Background } from "../../src/components/shared/Background/index.jsx";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070714] flex items-center justify-center px-4 py-10">
      <Background />

      <div className="z-10 bg-[#1a1c2d] p-10 rounded-3xl shadow-2xl w-full max-w-md text-center space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
          {t('forgotPassword.title')}
        </h2>

        {submitted ? (
          <p className="text-green-400 text-sm">
            {t('forgotPassword.checkEmail')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block text-sm mb-1 text-white">{t('forgotPassword.email')}</label>
              <input
                type="email"
                placeholder={t('forgotPassword.emailPlaceholder')}
                className="w-full px-4 py-3 rounded-lg bg-[#2c2d3a] border border-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition"
            >
              {t('forgotPassword.sendLink')}
            </button>
          </form>
        )}

        <Link to="/login" className="text-sm text-purple-400 hover:underline">
          {t('forgotPassword.backToLogin')}
        </Link>
      </div>
    </main>
  );
};

export default ForgotPassword;