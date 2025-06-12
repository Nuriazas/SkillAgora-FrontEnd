import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-red-100 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">¡Error!</h1>
      <p className="text-lg mb-6">Ocurrió un problema durante el login.</p>
      <Link to="/login" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
        Volver al Login
      </Link>
    </div>
  );
};

export default ErrorPage;
