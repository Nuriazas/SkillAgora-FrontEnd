import React from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FormRegister = ({ form, handleChange, loading }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="space-y-2 w-full max-w-xs mx-auto">
        <div>
          {/* <label htmlFor="name" className="block mb-1 text-white font-semibold text-xs">
            First Name
          </label> */}
          <input
            id="name"
            type="text"
            name="name"
            placeholder="First Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-1 py-[2px] rounded-lg bg-[#2C2B36] tect-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ligthCyan text-[7px]"
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
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-1 py-[2px]1 rounded-lg bg-[#2C2B36] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lightCyan text-[7px]"
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
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-1 py-[2px] rounded-lg bg-[#2C2B36] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lightCyan text-[7px]"
            required
            aria-required="true"
          />
        </div>
        <div>
          {/* <label htmlFor="password" className="block mb-1 text-white font-semibold text-xs">
            Password
          </label> */}
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-1 py-[2px] rounded-lg bg-[#2C2B36] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lightCyan text-[7px]"
            required
            aria-required="true"
          />
        </div>

        {/* Remember me + Forgot */}
        <div className="flex justify-between items-center text-white text-[7px]">
          <label className="flex items-center gap-1 select-none cursor-pointer">
            <input type="checkbox" className="w-2 h-3 rounded border-gray-400 bg-[#2C2B36] focus:ring-lightCyan" />
            <span>Remember me?</span>
          </label>
          <a href="#" className="hover:text-lightCyan transition-colors">
            Forgot Password
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-lightCyan text-[#064E3B] font-bold py-1 rounded-lg hover:bg-[#94e2cd] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-xs"
          aria-label="Sign up"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Sign up"}
        </button>

        <p className="text-center text-white text-[7px] mt-1">
          or sign in with other accounts?
        </p>
        <div className="flex justify-center gap-3 mt-1 text-white text-base cursor-pointer">
          <FaGoogle className="hover:text-lightCyan transition-colors" />
          <FaFacebookF className="hover:text-lightCyan transition-colors" />
          <FaInstagram className="hover:text-lightCyan transition-colors" />
          <FaLinkedinIn className="hover:text-lightCyan transition-colors" />
        </div>

        <p className="text-center text-white text-[7px] mt-1">
          Already have an account?{" "}
          <span 
            onClick={() =>navigate("/login")}
          className="text-lightCyan hover:underline">
      
            Click here to sign in.
          
          </span>
        </p>
      </div>
    </>
  );
};

export default FormRegister;
