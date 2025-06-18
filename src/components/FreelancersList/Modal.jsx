import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../shared/UI";
import { useNavigate } from "react-router-dom";

export const Modal = ({ freelancer, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (!freelancer) return null;

  // Valores por defecto para campos opcionales
  const {
    name = "",
    avatar = "https://via.placeholder.com/150",
    specialty = "general",
    location = t("freelancerCard.remote"),
    hourly_rate = 0,
    rating = 0,
    bio = "",
    id = null,
  } = freelancer;

  const handleContact = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      // Aquí podríamos implementar la lógica de contacto
      // Por ahora, redirigimos al perfil del freelancer
      navigate(`/profile/${name}`);
    } catch (error) {
      console.error("Error al contactar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-lightCard dark:bg-darkCard rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <img
              src={avatar}
              alt={name}
              className="w-24 h-24 rounded-full object-cover border-4 border-lightBackground dark:border-darkBackground hover:scale-110 transition-transform"
            />
            <div>
              <h2 className="text-lightText dark:text-darkText text-2xl font-bold hover:text-lightBlue dark:hover:text-darkBlue transition-colors">
                {name}
              </h2>
              <p className="text-lightBlue dark:text-darkBlue">
                {t(`freelancers.specialties.${specialty}`)}
              </p>
            </div>
          </div>
          <Button
            onClick={onClose}
            className="text-lightText hover:text-lightGrayText dark:text-darkText dark:hover:text-darkGrayText"
            aria-label={t("modal.close")}
          >
            ✕
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lightGrayText dark:text-darkGrayText">
            <span role="img" aria-label={t("modal.location")}>
              📍
            </span>
            <span>{location}</span>
          </div>
          <p className="text-lightGrayText dark:text-darkGrayText">
            {bio || t(`freelancers.descriptions.${specialty}`)}
          </p>
          <div className="flex justify-between items-center">
            <div className="text-lightText dark:text-darkText text-lg font-medium">
              {hourly_rate}
              {t("freelancerCard.perHour")}
            </div>
            <div className="text-yellow-500 text-base flex items-center gap-1">
              <span role="img" aria-label={t("modal.rating")}>
                ★
              </span>
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
          <Button
            className="w-full mt-4 px-6 py-3 bg-lightBlue hover:bg-blue-600 dark:bg-darkBlue dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleContact}
            disabled={isLoading || !id}
          >
            {isLoading ? t("modal.contacting") : t("modal.contact")}
          </Button>
        </div>
      </div>
    </div>
  );
};
