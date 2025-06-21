import React from "react";
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaComments } from "react-icons/fa";
import { Background } from "../components/background";

const ContactPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070714] flex items-center justify-center px-4 py-10">
      <Background />

      <div className="z-10 bg-[#1a1c2d] p-10 rounded-3xl shadow-2xl w-full max-w-xl text-center space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Contact Us
        </h2>
        <p className="text-gray-400 text-sm">
          Choose the method you'd like to use to get in touch with us
        </p>

        <div className="space-y-4 text-left">
          <a
            href="https://wa.me/34600123456"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-[#2c2d3a] hover:bg-[#3a3b4a] transition"
          >
            <FaWhatsapp className="text-green-400 text-xl" />
            <div>
              <h3 className="text-white font-semibold">WhatsApp</h3>
              <p className="text-gray-400 text-sm">+34 600 123 456</p>
            </div>
          </a>

          <a
            href="mailto:contacto@skillagora.com"
            className="flex items-center gap-4 p-4 rounded-xl bg-[#2c2d3a] hover:bg-[#3a3b4a] transition"
          >
            <FaEnvelope className="text-purple-400 text-xl" />
            <div>
              <h3 className="text-white font-semibold">Email</h3>
              <p className="text-gray-400 text-sm">contacto@skillagora.com</p>
            </div>
          </a>

          <a
            href="tel:+34600123456"
            className="flex items-center gap-4 p-4 rounded-xl bg-[#2c2d3a] hover:bg-[#3a3b4a] transition"
          >
            <FaPhoneAlt className="text-blue-400 text-xl" />
            <div>
              <h3 className="text-white font-semibold">Phone</h3>
              <p className="text-gray-400 text-sm">+34 600 123 456</p>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#2c2d3a] hover:bg-[#3a3b4a] transition cursor-default">
            <FaComments className="text-indigo-400 text-xl" />
            <div>
              <h3 className="text-white font-semibold">Live Chat</h3>
              <p className="text-gray-400 text-sm">Available 9:00 to 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
