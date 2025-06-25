import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContextProvider.jsx";

// componente para el pie de página (footer)

const Footer = () => {
  const { t } = useTranslation();
  const { userLogged } = useContext(AuthContext);
  const footerSections = [
    {
      title: t("footer.forClients"),
      links: [
        { name: t("footer.findServices"), to: "/services" },
        { name: t("footer.postJob"), to: "/services/create" },
        { name: t("footer.myOrders"), to: "#" },
      ],
    },
    {
      title: t("footer.forFreelancers"),
      links: [
        { name: t("footer.createService"), to: "/services/create" },
        { name: t("footer.browseJobs"), to: "/services" },
        { name: t("footer.myProfile"), to: userLogged ? `/users/profile/${userLogged.name}` : "/login" },
      ],
    },
    {
      title: t("footer.support"),
      links: [
        { name: t("footer.helpCenter"), to: "/help" },
        { name: t("footer.contact"), to: "/contact" },
        { name: t("footer.terms"), to: "/terms" },
      ],
    },
  ];

  return (  // Retorna el pie de página con sus secciones y enlaces
    <footer className="bg-gray-900/80 backdrop-blur-xl text-white py-12 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              SkillAgora
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {t("footer.description")}
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
                      aria-label={t("footer.goTo", { name: link.name })}
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
            &copy; {new Date().getFullYear()} SkillAgora. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;