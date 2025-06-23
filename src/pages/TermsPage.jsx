import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const termsContent = [
  {
    title: "1. Introduction",
    body: `Welcome to SkillAgora. By accessing and using our platform, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our services.`,
  },
  {
    title: "2. Acceptance of Terms",
    body: `Using the platform implies full acceptance of all terms described here. SkillAgora may update these terms at any time without prior notice.`,
  },
  {
    title: "3. Use of the Platform",
    body: `Users must be at least 18 years old. Fraudulent or illegal use is prohibited. SkillAgora reserves the right to suspend accounts in case of misuse.`,
  },
  {
    title: "4. User Responsibilities",
    body: `Each user is responsible for the information they provide and for all transactions conducted on the platform.`,
  },
  {
    title: "5. Intellectual Property",
    body: `All content on the platform, including logos, text, and designs, belongs to SkillAgora or its licensors. Reproduction without permission is strictly prohibited.`,
  },
  {
    title: "6. Limitation of Liability",
    body: `SkillAgora is not liable for any direct or indirect damages resulting from the use of the platform or from third-party content.`,
  },
  {
    title: "7. Modifications",
    body: `We reserve the right to modify these terms at any time. Updates will become effective once published on the platform.`,
  },
  {
    title: "8. Contact",
    body: (
      <>
        If you have any questions about these Terms & Conditions, feel free to contact us at{" "}
        <a
          href="mailto:legal@skillagora.com"
          className="text-blue-400 underline hover:text-blue-300"
        >
          legal@skillagora.com
        </a>.
      </>
    ),
  },
];

const TermsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-[#070714] text-white min-h-screen px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-12">
          Terms & Conditions
        </h1>

        <div className="space-y-4">
          {termsContent.map((item, index) => (
            <div key={index} className="border border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 hover:bg-gray-700 transition-all"
              >
                <span className="text-left text-lg font-semibold">{item.title}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-sm text-gray-300 border-t border-gray-700">
                  <p>{item.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
