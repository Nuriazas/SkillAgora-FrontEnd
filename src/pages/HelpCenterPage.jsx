import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Background } from "../components/background";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  CreditCard,
  Wrench,
  ChevronDown,
  ChevronUp,
  Search,
  Mail,
  Star,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const HelpCenterPage = () => {
  const { t } = useTranslation();
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [search, setSearch] = useState("");

  // Definir categorías y artículos desde traducciones
  const categories = t('helpCenter.categories', { returnObjects: true });

  const categoryIcons = {
    Account: <User className="inline-block mr-2" size={20} />,
    Payments: <CreditCard className="inline-block mr-2" size={20} />,
    Services: <Wrench className="inline-block mr-2" size={20} />,
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenQuestion(null);
  };

  const toggleQuestion = (title) => {
    setOpenQuestion(openQuestion === title ? null : title);
  };

  const highlightMatch = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={index} className="bg-yellow-300 text-black px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Filtrar artículos según búsqueda
  const filteredArticles = categories
    .map((section) => {
      const filteredItems = section.items.filter(
        (item) =>
          t(item.title).toLowerCase().includes(search.toLowerCase()) ||
          item.content.some((c) => t(c).toLowerCase().includes(search.toLowerCase()))
      );
      return filteredItems.length > 0 ? { ...section, items: filteredItems } : null;
    })
    .filter(Boolean);

  return (
    <main className="bg-[#070714] text-white min-h-screen px-6 py-12">
      <Background />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {t('helpCenter.title')}
          </h1>
          <p className="mt-2 text-lg text-gray-400">{t('helpCenter.subtitle')}</p>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="relative w-full sm:w-2/3 md:w-1/2">
            <input
              type="text"
              placeholder={t('helpCenter.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-500 border border-[#1f1f2e] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <p className="text-center text-gray-500">{t('helpCenter.noResults')}</p>
        ) : (
          filteredArticles.map((section) => (
            <div
              key={section.category}
              className="bg-gray-900 rounded-2xl p-6 shadow-md border border-[#1f1f2e] mb-6"
            >
              <button
                onClick={() => toggleCategory(section.category)}
                className="w-full text-left flex justify-between items-center text-xl font-semibold text-blue-400"
              >
                <span>{categoryIcons[section.category]} {t(`helpCenter.categoryNames.${section.category}`)}</span>
                {openCategory === section.category ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              <AnimatePresence>
                {openCategory === section.category && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-4 space-y-3"
                  >
                    {section.items.map((item) => (
                      <li key={item.title}>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => toggleQuestion(item.title)}
                            className="text-left text-white hover:underline text-base"
                          >
                            {highlightMatch(t(item.title))}
                          </button>
                          {item.tag && (
                            <span className="ml-2 px-2 py-1 rounded bg-blue-800 text-xs text-white">
                              {t(`helpCenter.tags.${item.tag}`)}
                            </span>
                          )}
                        </div>

                        <AnimatePresence>
                          {openQuestion === item.title && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 mt-2 space-y-2 text-gray-300"
                            >
                              {item.content.map((c, idx) => (
                                <li key={idx}>{highlightMatch(t(c))}</li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))
        )}

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-2">{t('helpCenter.stillNeedHelp')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
          >
            <Mail className="mr-2" size={18} />
            {t('helpCenter.contactSupport')}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HelpCenterPage;