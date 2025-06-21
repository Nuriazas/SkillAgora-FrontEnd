import React from "react";
import { Link } from "react-router-dom";
import { Background } from "../components/background";

const helpArticles = [
  {
    category: "Cuenta",
    items: [
      { title: "¿Cómo creo una cuenta?", to: "/help/account/create" },
      { title: "¿Olvidaste tu contraseña?", to: "/help/account/reset-password" },
    ],
  },
  {
    category: "Pagos",
    items: [
      { title: "Formas de pago aceptadas", to: "/help/payments/methods" },
      { title: "¿Cómo solicito un reembolso?", to: "/help/payments/refunds" },
    ],
  },
  {
    category: "Servicios",
    items: [
      { title: "Publicar un servicio", to: "/help/services/post" },
      { title: "Buscar y contratar", to: "/help/services/find-hire" },
    ],
  },
];

const HelpCenterPage = () => {
  return (
    <main className="relative min-h-screen bg-[#070714] text-white px-6 py-12">
      <Background />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Centro de Ayuda
        </h1>
        <p className="text-center text-gray-400 mb-12">
          Encuentra respuestas a tus preguntas frecuentes o contáctanos si necesitas ayuda.
        </p>

        <div className="grid gap-8 sm:grid-cols-2">
          {helpArticles.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-semibold mb-4">{section.category}</h2>
              <ul className="space-y-2 text-gray-300">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      to={item.to}
                      className="hover:underline hover:text-white transition"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HelpCenterPage;