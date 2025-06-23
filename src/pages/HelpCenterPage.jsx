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

const categoryIcons = {
  Account: <User className="inline-block mr-2" size={20} />,
  Payments: <CreditCard className="inline-block mr-2" size={20} />,
  Services: <Wrench className="inline-block mr-2" size={20} />,
};

const helpArticles = [
  {
    category: "Account",
    items: [
      {
        title: "How do I create an account?",
        to: "/help/account/create",
        content: [
          "Click on 'Sign Up' at the top right corner.",
          "Enter your email address and a secure password.",
          "Confirm your email through the link we send you.",
          "You're all set! You can now log in.",
        ],
        tag: "New",
      },
      {
        title: "Forgot your password?",
        to: "/help/account/reset-password",
        content: [
          "Go to the login page.",
          "Click on 'Forgot your password?'.",
          "Enter your registered email address.",
          "Check your inbox to reset your password.",
        ],
        tag: "Updated",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        title: "Accepted payment methods",
        to: "/help/payments/methods",
        content: [
          "Credit or debit cards.",
          "PayPal.",
          "Bank transfer (business only).",
        ],
        tag: null,
      },
      {
        title: "How do I request a refund?",
        to: "/help/payments/refunds",
        content: [
          "Go to your payment history.",
          "Select the transaction you want to refund.",
          "Click on 'Request a refund'.",
          "Please allow 3–5 business days for processing.",
        ],
        tag: "Popular",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        title: "How to post a service",
        to: "/help/services/post",
        content: [
          "Log in to your account.",
          "Click on 'Post a service'.",
          "Fill in the required details.",
          "Save and publish.",
        ],
        tag: null,
      },
      {
        title: "Search and hire",
        to: "/help/services/find-hire",
        content: [
          "Use the search bar.",
          "Filter by category or location.",
          "Review ratings before hiring.",
        ],
        tag: null,
      },
    ],
  },
];

const HelpCenterPage = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [search, setSearch] = useState("");

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

  const filteredArticles = helpArticles
    .map((section) => {
      const filteredItems = section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.content.some((c) => c.toLowerCase().includes(search.toLowerCase()))
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
            Help Center
          </h1>
          <p className="mt-2 text-lg text-gray-400">Help is the bridge between doubt and action.</p>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="relative w-full sm:w-2/3 md:w-1/2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-800 text-white placeholder-gray-500 border border-[#1f1f2e] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <p className="text-center text-gray-500">No results found.</p>
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
                <span>{categoryIcons[section.category]} {section.category}</span>
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
                            {highlightMatch(item.title)}
                          </button>
                          {item.tag && (
                            <span className="ml-2 text-xs bg-blue-600 px-2 py-1 rounded-full text-white">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <AnimatePresence>
                          {openQuestion === item.title && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 ml-4 list-disc text-sm text-gray-400 space-y-1 overflow-hidden"
                            >
                              {item.content.map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Star size={12} className="mt-1" /> {highlightMatch(step)}
                                </li>
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
          <p className="text-gray-400 mb-2">Still need help?</p>
          <Link
            to="/contact"
            className="inline-flex items-center px-5 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
          >
            <Mail className="mr-2" size={18} />
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HelpCenterPage;