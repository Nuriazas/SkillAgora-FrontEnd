import React, { useEffect, useState } from "react";
import { FiUserPlus, FiX, FiCheckCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const FloatingFreelancerButton = ({ show, user }) => {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!show || closed) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [show, closed]);

  if (!show || closed || !user || user.role !== "client" || user.id === 1 || !visible) return null;

  const handleRequest = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/request-freelancer-status/${user.id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setClosed(true), 2500);
      } else if (data?.message?.includes("pendiente")) {
        setPending(true);
        setTimeout(() => setClosed(true), 2500);
      } else {
        alert(data?.message || t('floatingFreelancerButton.error', 'Error inesperado.'));
      }
    } catch (e) {
      alert(t('floatingFreelancerButton.error', 'Error inesperado.'));
    }
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-purple-500/30 transition-all duration-500 opacity-100 scale-100 animate-pop"
      style={{ minWidth: 220 }}
    >
      <button
        className="absolute top-1 right-2 text-white/70 hover:text-white text-lg"
        onClick={() => setClosed(true)}
        aria-label={t('floatingFreelancerButton.close', 'Cerrar')}
        style={{ background: "none", border: "none" }}
      >
        <FiX />
      </button>
      <FiUserPlus className="w-6 h-6 mr-2" />
      <div className="flex-1">
        {success ? (
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-green-300" />
            <span className="font-semibold block">
              {t('profile.freelancerRequestSuccess', 'Solicitud enviada exitosamente. Te contactaremos pronto.')}
            </span>
          </div>
        ) : pending ? (
          <span className="font-semibold block text-yellow-200">
            {t('floatingFreelancerButton.pending', 'Ya tienes una solicitud pendiente.')}
          </span>
        ) : (
          <>
            <span className="font-semibold block">{t('floatingFreelancerButton.wantToBe', '¿Quieres ser freelancer?')}</span>
            <button
              className="mt-1 px-3 py-1 bg-white text-purple-700 rounded-lg text-xs font-semibold hover:bg-purple-100 transition-all duration-200 shadow"
              onClick={handleRequest}
            >
              {t('floatingFreelancerButton.requestHere', 'Solicítalo aquí')}
            </button>
          </>
        )}
      </div>
      <style>{`
        @keyframes pop {
          0% { opacity: 0; transform: scale(0.8); }
          80% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-pop { animation: pop 0.5s cubic-bezier(.68,-0.55,.27,1.55); }
      `}</style>
    </div>
  );
};

export default FloatingFreelancerButton; 