import React from "react";

import { Routes, Route } from 'react-router-dom';
import Validacion from './pages/Validacion';
import Login from './pages/Login';
import NotFoundPage from "./components/NotFoundPage.jsx";
import LandingPage from './pages/LandingPage.jsx';
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Spinner from "./components/Spinner.jsx";


function SpinnerPage() {
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
function App() {
  return (
    <ErrorBoundary>
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/register" element={<RegisterPage />} />
          <Route path="/validacion" element={<Validacion />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      
    </ErrorBoundary>
  );
}

export default App;
