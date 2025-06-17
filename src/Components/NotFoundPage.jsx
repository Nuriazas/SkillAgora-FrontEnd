import React from "react";
import { Background } from "./background.jsx";
function NotFoundPage() {
  return (
      <main className="relative min-h-screen overflow-hidden bg-transparent">
      
        <Background />
      
      <section className="relative z-10 flex flex-col justify-center items-center bg-transparent bg-opacity-90 text-white text-center p-4 sm:px-20 sm:py-12 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-white">404 - Página no encontrada</h1>
        <p className="text-base sm:text-xl">La ruta que estas buscando no existe</p>
      </section>
    </main>
  );
}
export default NotFoundPage;
