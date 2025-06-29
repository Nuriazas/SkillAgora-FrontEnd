import React from "react";

const LogoLoader = ({ size = 64 }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src="/SkillAgoraLogo.svg"
        alt="SkillAgora Logo Loader"
        style={{ width: size, height: size }}
        className="animate-logo-pulse"
      />
    </div>
  );
};

export default LogoLoader;

// Animación personalizada en Tailwind (agregar en el CSS global):
// .animate-logo-pulse {
//   animation: logo-pulse 1.2s infinite cubic-bezier(0.4, 0, 0.6, 1);
// }
// @keyframes logo-pulse {
//   0%, 100% { transform: scale(1); opacity: 1; }
//   50% { transform: scale(1.15); opacity: 0.85; }
// } 