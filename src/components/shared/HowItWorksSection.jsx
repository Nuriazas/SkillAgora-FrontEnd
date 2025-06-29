import React from "react";
import { useTranslation } from "react-i18next";
import { FiUserPlus, FiBriefcase, FiMessageCircle } from "react-icons/fi";

const HowItWorksSection = () => {
  const { t } = useTranslation();
  const steps = t('howItWorks.steps', { returnObjects: true });
  const icons = [FiUserPlus, FiBriefcase, FiMessageCircle];

  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          {t('howItWorks.title', '¿Cómo funciona?')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = icons[idx] || FiUserPlus;
            return (
              <div key={idx} className="bg-gray-900/70 rounded-2xl p-8 flex flex-col items-center shadow-lg border border-gray-800/40 hover:shadow-purple-500/10 transition-all duration-200">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 mb-6 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 text-center">{step.title}</h3>
                <p className="text-gray-300 text-center text-base">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 