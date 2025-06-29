import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const PasswordInput = ({ value, onChange, placeholder, name = "password" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // Placeholder internacionalizado por defecto
  const inputPlaceholder = placeholder || t("formRegister.password", "Contraseña");

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={inputPlaceholder}
        className="w-full px-8 py-4 pr-12 rounded-lg bg-[#1a1c2d] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 text-[15px]"
        required
        aria-required="true"
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-300 focus:outline-none"
        tabIndex={-1}
        aria-label={showPassword ? t("formRegister.hidePassword", "Ocultar contraseña") : t("formRegister.showPassword", "Mostrar contraseña")}
      >
        {showPassword ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
      </button>
    </div>
  );
};

export default PasswordInput; 