import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = [
    {
      title: "Para Clientes",
      links: [
        { name: "Buscar Servicios", to: "/services" },
        { name: "Publicar Trabajo", to: "/services/create" },
        { name: "Mis Órdenes", to: "#" }
      ]
    },
    {
      title: "Para Freelancers",
      links: [
        { name: "Crear Servicio", to: "/services/create" },
        { name: "Buscar Trabajos", to: "/services" },
        { name: "Mi Perfil", to: "/users/profile/usuario" }
      ]
    },
    {
      title: "Soporte",
      links: [
        { name: "Centro de Ayuda", to: "/help" },
        { name: "Contacto", to: "/contact" },
        { name: "Términos", to: "/terms" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900/80 backdrop-blur-xl text-white py-12 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              SkillAgora
            </h3>
            <p className="text-gray-400 leading-relaxed">
              La plataforma líder para conectar talento con oportunidades.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="hover:text-purple-400 transition-colors"
                      aria-label={`Ir a ${link.name}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SkillAgora. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;