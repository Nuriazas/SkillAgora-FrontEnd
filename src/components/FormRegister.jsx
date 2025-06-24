import React from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./shared/UI/PasswordInput";
import { useTranslation } from "react-i18next";

const FormRegister = ({ form, handleChange, loading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div className="space-y-3 w-full max-w-ms mx-auto">
        <div>
          {/* <label htmlFor="name" className="block mb-1 text-white font-semibold text-xs">
            First Name
          </label> */}
          <input
            id="name"
            type="text"
            name="name"
            placeholder={t('formRegister.firstName')}
            value={form.name}
            onChange={handleChange}
            className="w-full px-8 py-4 rounded-lg bg-[#1a1c2d] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300
                text-[15px]"
            required
            aria-required="true"
          />
        </div>
        <div>
          {/* <label htmlFor="lastName" className="block mb-1 text-white font-semibold text-xs">
            Last Name
          </label> */}
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder={t('formRegister.lastName')}
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-8 py-4 rounded-lg bg-[#1a1c2d] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300
                text-[15px]"
            required
            aria-required="true"
          />
        </div>
         <div>
          {/* <label htmlFor="email" className="block mb-1 text-white font-semibold text-xs">
            Email
          </label> */}
          <input
            id="email"
            type="email"
            name="email"
            placeholder={t('formRegister.email')}
            value={form.email}
            onChange={handleChange}
            className="w-full px-8 py-4 rounded-lg bg-[#1a1c2d] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300
                text-[15px]"
            required
            aria-required="true"
          />
        </div>
        <div>
          {/* <label htmlFor="password" className="block mb-1 text-white font-semibold text-xs">
            Password
          </label> */}
          <PasswordInput
            value={form.password}
            onChange={handleChange}
            placeholder={t('formRegister.password')}
            name="password"
          />
        </div>

        {/* Remember me + Forgot */}
        

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400  text-[15px]
                hover:from-purple-700 hover:to-blue-700 text-white  rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-purple-500/25 w-full py-2"
          aria-label={t('formRegister.signUp')}
          disabled={loading}
        >
          {loading ? <Spinner /> : t('formRegister.signUp')}
        </button>

        <p className="text-center text-white text-[15px] mt-1">
          {t('formRegister.orOtherAccounts')}
        </p>
        <div className="flex justify-center gap-3 mt-1 text-white text-base cursor-pointer">
          <FaGoogle size={30}className="hover:text-purple-300 transition-colors" />
          <FaFacebookF size={30} className="hover:text-purple-300 transition-colors" />
          <FaInstagram size={30}className="hover:text-purple-300 transition-colors" />
          <FaLinkedinIn size={30}className="hover:text-purple-300 transition-colors" />
        </div>

        <p className="text-center text-white text-[15px] mt-1">
          {t('formRegister.alreadyAccount')}{" "}
          <span 
            onClick={() =>navigate("/login")}
            className="text-purple-300 hover:underline">
            {t('formRegister.clickToSignIn')}
          </span>
        </p>
      </div>
    </>
  );
};

export default FormRegister;
