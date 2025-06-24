import React from "react";
import DefaultAvatar from "../assets/defaultAvatar.jpeg";
import { useTranslation } from "react-i18next";

function UseAvatar({ avatarUrl }) {
  const { t } = useTranslation();
  const handleError = (e) => {
    if (e.target.src !== DefaultAvatar) {
      e.target.src = DefaultAvatar;
    }
  };

  return (
    <img
      src={avatarUrl || DefaultAvatar}
      alt={t('avatar.userAvatar')}
      className="w-12 h-12 rounded-full object-cover"
      onError={handleError}
    />
  );
}

export default UseAvatar;




