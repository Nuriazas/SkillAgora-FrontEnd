import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder = "Contraseña", name = "password" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-8 py-4 pr-12 rounded-lg bg-[#1a1c2d] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 text-[15px]"
        required
        aria-required="true"
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-300 focus:outline-none"
        tabIndex={-1}
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {showPassword ? <FaEye size={22} /> : <FaEyeSlash size={22} />}
      </button>
    </div>
  );
};

export default PasswordInput; 