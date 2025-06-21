import React from "react";
import { Routes, Route } from "react-router-dom";
import Validacion from "./pages/Validacion";
import Freelancer from "./pages/FreelancerPage";
import CreateServicePage from "./pages/CreateServicePage";
import Login from "./pages/Login";
import NotFoundPage from "./components/NotFoundPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ServicesPage from "./pages/ServicesPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Spinner from "./components/Spinner.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx"; // 👈 AÑADIDO

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
				<Route path="/freelancers" element={<Freelancer />} />
				<Route path="/services" element={<ServicesPage />} />
				<Route path="/services/create" element={<CreateServicePage />} />
				<Route path="/users/profile/:name" element={<ProfilePage />} />
				<Route path="/forgot-password" element={<ForgotPassword />} /> {/* 👈 NUEVA RUTA */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</ErrorBoundary>
	);
}

export default App;

